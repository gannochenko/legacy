import React from 'react';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import RegistryObjectImported from '../../../../../api/registry.object.imported/entity/entity.client.js';
import RegistryObject from '../../../../../api/registry.object/entity/entity.client.js';
import conditionEnum from '../../../../../api/registry.object/enum/condition.js';
import kindEnum from '../../../../../api/registry.object/enum/kind.js';

// import GoogleMap from '../../../../component/general/google-map/index.jsx';
import YandexMap from '../../../../component/map.yandex';
import Selector from '../../../../component/general/etc/selector';
import Modal from '../../../../component/general/etc/modal';

import AutoForm from 'uniforms-unstyled/AutoForm';

import './style.less';

export default class Matcher extends BaseComponent
{
    _map = null;
    _panMap = false;

    constructor(props)
    {
        super(props);
        this.extendState({
            ids: [],
            pair: null,
            toVerify: 0,
            editWindowOpened: false,
            objectToEdit: null,
        });
    }

    componentWillMount()
    {
        this.loadData();
        this.loadIds().then((list) => {
            this.setNext(this.getId(this.props), list);
        });
        this.loadCounter();
    }

    componentWillReceiveProps(props)
    {
        if ('id' in props && this.props.id !== props.id)
        {
            this.loadData(props).then((item) => {
                if (this._map)
                {
                    this._map.panTo(item.getLocationFirst());
                }
            });
            this.setNext(props.id, this.state.ids);
        }
    }

    // componentDidUpdate()
    // {
    //     if (this._panMap)
    //     {
    //         if (this._map)
    //         {
    //             this._map.panToFirst();
    //         }
    //         this._panMap = false;
    //     }
    // }

    componentDidMount()
    {
        const id = this.getId(this.props);
        if (!_.isStringNotEmpty(id))
        {
            this.loadIds().then((list) => {
                if (_.isArrayNotEmpty(list))
                {
                    FlowRouter.go(`/matcher/${list[0]._id}`);
                }
            });
        }

        $(document).on('click', '.modify-click', (e) => {
            this.onModifyObjectClick($(e.target).data('id'));
        });
    }

    onModifyObjectClick(id) {
        if (_.isStringNotEmpty(id)) {
            const editItem = this.state.nearest.find((item) => {
                return item.getId().toString() === id.toString();
            });

            // reset model
            this._editModel = {
                name: editItem.getName(),
                nameOriginal: this.getData().getName(),
                rebuilt: editItem.getAltered(),
                condition: editItem.getCondition(),
                notes: editItem.getNote(),
                location: editItem.extractLocation(),
                id,
            };

            if (!_.isArrayNotEmpty(this._editModel.location)) {
                this._editModel.location = this.getData().getLocation();
            }
        } else {
            // reset model
            this._editModel = {
                name: '',
                nameOriginal: this.getData().getName(),
                rebuilt: false,
                condition:[],
                location: this.getData().extractLocation(),
                notes: '',
                kind: [],
                locationDescription: this.getData().getDescription(),
            };
        }
        //
        // console.dir('this._editModel');
        // console.dir(this._editModel);

        this.setState({
            editWindowOpened: true,
            justCreatedId: '',
            // objectToEdit: editItem,
        });
    }

    onUpdateObjectClick() {
        // const title = this._newName.value;
        // console.dir(title);

        const editModel = this.getEditModel();

        const id = editModel.id;

        if (_.isStringNotEmpty(id)) {
            const editItem = this.state.nearest.find((item) => {
                return item.getId().toString() === id.toString();
            });

            if (editItem) {
                editItem.setName(editModel.name);
                editItem.setNameOriginal(editModel.nameOriginal);
                editItem.setAltered(editModel.rebuilt);
                editItem.setCondition(editModel.condition);
                editItem.setNote(editModel.notes);

                const loc = editModel.location[0];
                editItem.getData().sourceReference = `${loc.lat.toFixed(6)}|${loc.lng.toFixed(6)}`;

                if (!editItem.hasLocation()) {
                    editItem.putLocation(editModel.location);
                }

                editItem.save();
            }
        } else {
            const item = new RegistryObject();
            item.setName(editModel.name);
            item.setNameOriginal(editModel.nameOriginal);
            item.setAltered(editModel.rebuilt);
            item.setCondition(editModel.condition);
            item.putLocation(editModel.location);
            item.setNote(editModel.notes);
            item.setKind(editModel.kind);
            item.setLocationDescription(editModel.locationDescription);

            item.save().then((res) => {
                if (res.isSuccess()) {
                    this.setState({
                        justCreatedId: res.getId(),
                    });
                } else {
                    console.dir(res);
                }
            });
        }
    }

    onEditWindowClose() {
        this.closeEditWindow();
    }

    closeEditWindow() {
        this.setState({
            editWindowOpened: false,
        });
    }

    setNext(id, list)
    {
        this.setState({
            pair: this.findPair(id, list),
        });
    }

    getId(props)
    {
        props = props || this.props;
        return props.id || '';
    }

    setData(data)
    {
        this.setState({
            data,
        });
    }

    getData()
    {
        return this.state.data || {};
    }

    loadIds()
    {
        return this.getApplication().wait(RegistryObjectImported.find({
            select: ['_id'],
            sort: {'name': 1},
            filter: {
                verified: {$ne: true},
                incorrectData: {$ne: true},
            },
        }, {returnArray: true})).then((ids) => {
            this.setState({
                ids
            });
            return ids;
        }).catch((e) => {
            return [];
        });
    }

    findPair(base, list)
    {
        for(let k = 0; k < list.length; k++)
        {
            if (list[k]._id === base) {
                return {
                    prev: k > 0 ? list[k - 1]._id : null,
                    next: k < list.length - 1 ? list[k + 1]._id : null,
                };
            }
        }

        return {prev: null, next: null};
    }

    loadCounter()
    {
        RegistryObjectImported.getCount({verified: {$ne: true}, incorrectData: {$ne: true}}).then((res) => {
            this.setState({
                toVerify: res,
            });
        });
    }

    loadData(props)
    {
        const id = this.getId(props);
        if (!_.isStringNotEmpty(id))
        {
            return null;
        }

        return this.getApplication().wait(RegistryObjectImported.findOne({filter: {
            _id: this.getId(props),
        }, select: '#'})).then((item) => {
            if (item)
            {
                this.loadNearest(item).then((nearest) => {
                    this.setData(item);
                    this.setState({nearest});
                    this.setTitle(item.getName());
                });
            }
            else
            {
                this.setData({});
                this.setState({nearest: []});
                // this.setError('Not found');
            }

            return item;
        }).catch((e) => {
            console.dir(e);
            // notify
            // this.setError(e.message);
        });
    }

    async loadNearest(item) {

        const filter = {$or: []};
        const e = 0.001;

        item.getLocation().forEach((loc) => {
            filter.$or.push({
                'location.lat': {$gt: loc.lat - e, $lt: loc.lat + e},
                'location.lng': {$gt: loc.lng - e, $lt: loc.lng + e},
            });
        });

        const name = item.getDescription();
        if (_.isStringNotEmpty(name)) {
            const res = name.match(new RegExp('ID ([a-zA-Z0-9\u0400-\u04FF]+)'));
            if (_.isArrayNotEmpty(res) && _.isStringNotEmpty(res[1])) {
                filter.$or.push({code: res[1]});
            }
        }

        return RegistryObject.find({filter, select: ['id', 'name', 'nameOriginal', 'location', 'condition', 'note', 'altered', 'kind']});
    }

    isPreview()
    {
        return !!this.props.preview;
    }

    isReady()
    {
        return _.isObjectNotEmpty(this.state.data) && _.isArrayNotEmpty(this.state.ids) && this.state.pair !== null;
    }

    extractTitle(title)
    {
        const found = title.split(/\r\n/);

        if (_.isStringNotEmpty(found[0]))
        {
            title = found[0].trim().replace(/:$/, '');
        }

        return title;
    }

    getMapCenter()
    {
        // const loc = this.getData().getLocationFirst();
        // if (loc)
        // {
        //     return loc;
        // }

        return {lat: 54.706841, lng: 20.509112};
    }

    getMarkers()
    {
        return this.getData().getLocation().map((location, i) => {
            return {
                code: `loc_${i}`,
                location
            };
        });
    }

    addLocation(location)
    {
        const d = this.getData();
        const locs = d.getLocation();
        locs.push(location);

        d.setLocation(locs);
    }

    onMapClick(location)
    {
        this.addLocation(location);
        // this.save();
    }

    onMapMarkerClick(code, loc)
    {
        const d = this.getData();
        const newLoc = d.getLocation().filter((item) => {
            return item.lat !== loc.lat || item.lng !== loc.lng;
        });

        d.setLocation(newLoc);
        // this.save();
    }

    onMakersPainted()
    {
        if (this._map)
        {
            if (this._panMap)
            {
                this._map.panToFirst();
                this._panMap = false;
            }
        }
    }

    onConditionSelectorChange(value)
    {
        this.getData().setCondition(value);
        //this.save();
    }

    onKindSelectorChange(value)
    {
        this.getData().setKind(value);
        //this.save();
    }

    onSearchKeyDown(e)
    {
        if (e.key === 'Enter')
        {
            const location = this.parseCoordinates(e.target.value);
            if (location !== null)
            {
                // add found location and save
                this._panMap = true;
                this.addLocation(location);
                //this.save();
            }
        }
    }

    parseCoordinates(value)
    {
        let result = {};
        let match = null;

        if (_.isStringNotEmpty(value) && _.isStringNotEmpty(value.trim()))
        {
            value = value.trim();

            // try simple format
            // 54.461451, 19.942015
            match = value.match(/(\d{2}\.\d{6}),\s?(\d{2}\.\d{6})/);
            if (_.isArrayNotEmpty(match) && _.isStringNotEmpty(match[1]) && _.isStringNotEmpty(match[2]))
            {
                result = {
                    lat: parseFloat(match[1]),
                    lng: parseFloat(match[2]),
                };
            }
            else
            {
                // try prussia39 format
                // 54°36'48'' (54.613581) с.ш., 21°13'47'' (21.229899) в.д.
                match = value.match(/\((\d{2}\.\d{6})\)\s+с.ш.,\s+\d+°\d+'\d+''\s+\((\d{2}\.\d{6})\)/);
                if (_.isArrayNotEmpty(match) && _.isStringNotEmpty(match[1]) && _.isStringNotEmpty(match[2]))
                {
                    result = {
                        lat: parseFloat(match[1]),
                        lng: parseFloat(match[2]),
                    };
                }
            }
        }

        if (!isNaN(result.lat) && !isNaN(result.lng))
        {
            return result;
        }
        return null;
    }

    onVerifiedClick()
    {
        const d = this.getData();
        d.setVerified(!d.getVerified());

        //this.save();
        d.save().then(() => {
            this.forceUpdate();
            this.loadCounter();
        });
    }

    onBadDataClick() {
        const d = this.getData();
        d.setIncorrectData(!d.getIncorrectData());

        //this.save();
        d.save().then(() => {
            this.forceUpdate();
            this.loadCounter();
        });
    }

    onRemarkableClick()
    {
        const d = this.getData();
        d.setRemarkable(!d.getRemarkable());
        this.save();
    }

    getNearest() {
        return this.state.nearest || [];
    }

    getMapCenter()
    {
        const location = this.getData().getLocationFirst();
        if (location)
        {
            return [location.lat, location.lng];
        }

        return [54.711374, 21.425965];
    }

    getPlaces() {
        if (!this.isReady()) {
            return null;
        }

        const places = [];
        const item = this.getData();
        if (item.hasLocation())
        {
            item.getLocation().forEach((location, i) => {
                location._id = location._id || _.random(100000, 999999);
                places.push({
                    type: 'O',
                    id: location._id,
                    geometry: {
                        type: 'Point',
                        coordinates: [location.lat, location.lng],
                    },
                    options: {
                        preset: 'islands#blueIcon',
                    },
                });
            });
        }

        // get nearby objects
        // https://yandex.ru/blog/mapsapi/53170
        if (_.isArrayNotEmpty(this.state.nearest)) {
            this.state.nearest.forEach((xxxxxxx) => {
                xxxxxxx.getLocation().forEach((location, i) => {
                    location._id = location._id || _.random(100000, 999999);
                    places.push({
                        type: 'O',
                        id: location._id,
                        geometry: {
                            type: 'Point',
                            coordinates: [location.lat, location.lng],
                        },
                        properties: {
                            balloonContent: `
<div>
    <div class="rb-margin-b_x rb-f-size_x1p25">
        ${xxxxxxx.getName()}
    </div>
    <button class="button modify-click rb-no-margin" data-id="${xxxxxxx.getId()}">Модифицировать этот объект</button>    
</div>
`,
                        }
                    });
                });
            });
        }

        return places;
    }

    onMapClick(coords)
    {
        // const locs = this.getData().extractLocation();
        // locs.push({
        //     lat: coords[0],
        //     lng: coords[1],
        // });
    }

    onMapMarkerClick(id)
    {
        // const locs = this.getData().getLocation().filter((loc) => {
        //     return loc._id !== id;
        // });
    }

    getEItem() {
        return this.state.objectToEdit;
    }

    onModalMount() {
    }

    getEditModel() {
        if (!this._editModel) {
            this._editModel = {};
        }

        return this._editModel;
    }

    /**
     * Renders the component
     * @returns {XML}
     * @access protected
     */
    render()
    {
        if (!this.isReady())
        {
            return null;
        }

        const item = this.getData();
        const title = this.extractTitle(item.getName());
        const name = item.getName().replace(/(\r\n)+/g, "\r\n");

        const editExisting = _.isStringNotEmpty(this.getEditModel().id);

        return (
            <div className="">
                <div className="registry-detail">
                    <div className="grid-x grid-margin-y grid-margin-x rb-margin-b_x">
                        {
                            (title !== name)
                            &&
                            <div className="cell medium-4">
                                <div className="registry-detail__data">
                                    {name}
                                </div>
                            </div>
                        }
                        {
                            item.hasDescription()
                            &&
                            <div className="cell medium-4">
                                <div className="registry-detail__label">
                                    Описание
                                </div>
                                <div className="registry-detail__data">
                                    {item.getDescription()}
                                </div>
                            </div>
                        }
                        <div className="cell medium-4">
                            <div className="registry-detail__label">
                                Местоположение
                            </div>
                            <div className="registry-detail__data">
                                {item.getLocation().map((location) => {
                                    return (
                                        <div className="" key={`${location.lat}${location.lng}`}>
                                            {location.lat}, {location.lng}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid-x grid-margin-y grid-margin-x rb-margin-b_x">
                        <div className="cell medium-6">
                            <div className="registry-detail__label">
                                Ближайшие объекты
                            </div>
                            <div className="registry-detail__data">
                                <div className="rb-group_x">
                                    {
                                        this.getNearest().map((nItem) => {
                                            return (
                                                <button
                                                    key={nItem.getId()}
                                                    className="pl-button pl-button_inactive"
                                                    onClick={this.onModifyObjectClick.bind(this, nItem.getId())}
                                                >
                                                    {nItem.getName()}
                                                </button>
                                            );
                                        })
                                    }
                                    <button
                                        className="pl-button pl-button_inactive"
                                        onClick={this.onModifyObjectClick.bind(this)}
                                    >
                                        Новый объект...
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="cell medium-3">
                            <div className="rb-group_x">
                                <button
                                    className={`checker__button ${this.getData().getVerified() ? 'checker__button_selected' : ''}`}
                                    onClick={this.onVerifiedClick.bind(this)}
                                >
                                    Проверено (осталось {this.state.toVerify})
                                </button>
                                <button
                                    className={`checker__button ${this.getData().getIncorrectData() ? 'checker__button_selected' : ''}`}
                                    onClick={this.onBadDataClick.bind(this)}
                                >
                                    Неточные данные
                                </button>
                            </div>
                        </div>
                        <div className="cell medium-3">
                            <div className="rb-group_x">
                                {
                                    _.isStringNotEmpty(this.state.pair.prev)
                                    &&
                                    <a href={`/matcher/${this.state.pair.prev}/`} className="button">&lt; Назад</a>
                                }
                                {
                                    _.isStringNotEmpty(this.state.pair.next)
                                    &&
                                    <a href={`/matcher/${this.state.pair.next}/`} className="button">Вперед &gt;</a>
                                }
                            </div>
                        </div>
                    </div>

                    {/*<div className="">*/}
                        {/*<div className="grid-x grid-margin-x">*/}
                            {/*<div className="cell large-6">*/}
                                {/*<div className="grid-y grid-margin-y">*/}
                                    {/*<div className="cell large-6">*/}
                                        {/*<button*/}
                                            {/*// className={`checker__button ${this.getData().getRemarkable() ? 'checker__button_selected' : ''}`}*/}
                                            {/*className={`checker__button ${true ? 'checker__button_selected' : ''}`}*/}
                                            {/*onClick={this.onRemarkableClick.bind(this)}*/}
                                        {/*>*/}
                                            {/*Выдающееся*/}
                                        {/*</button>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="cell large-6">*/}
                                {/*<Selector*/}
                                    {/*// value={this.getData().getKind()}*/}
                                    {/*items={kindEnum}*/}
                                    {/*onChange={this.onKindSelectorChange.bind(this)}*/}
                                    {/*multiple*/}
                                {/*/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    <YandexMap
                        center={this.getMapCenter()}
                        //zoom={this.getData().hasLocation() ? 17 : 9}
                        zoom={16}
                        markers={this.getPlaces()}
                        openBalloon={false}
                        onClick={this.onMapClick.bind(this)}
                        onMarkerClick={this.onMapMarkerClick.bind(this)}
                        ref={(ref) => { this._map = ref; }}
                    />

                    {
                        this.state.editWindowOpened
                        &&
                        <Modal
                            onClose={this.onEditWindowClose.bind(this)}
                        >
                            {/*<AutoForm*/}
                                {/*schema={{*/}
                                    {/*name: {*/}
                                        {/*type: String,*/}
                                        {/*label: 'RU',*/}
                                    {/*},*/}
                                    {/*nameOriginal: {*/}
                                        {/*type: String,*/}
                                        {/*label: 'DE',*/}
                                    {/*},*/}
                                    {/*rebuilt: {*/}
                                        {/*type: Boolean,*/}
                                        {/*label: 'Перестроен',*/}
                                    {/*},*/}
                                {/*}}*/}
                                {/*model={{*/}
                                    {/*name: this.getData().getName(),*/}
                                    {/*nameOriginal: this.getEItem().getName(),*/}
                                    {/*rebuilt: false,*/}
                                {/*}}*/}
                                {/*onSubmit={this.onSubmitForm.bind(this)}*/}
                            {/*>*/}
                                {/**/}
                            {/*</AutoForm>*/}
                            {/*<a href={`/registry/view/${this.getEItem().getId()}/basic/`} target="_blank" rel="noopener noreferrer">Посмотреть</a>*/}

                            {
                                _.isStringNotEmpty(this.state.justCreatedId)
                                &&
                                <div>
                                    <a href={`/view/${this.state.justCreatedId}/basic/`} target="_blank" rel="noopener noreferrer">Посмотреть</a>
                                </div>
                            }
                            {
                                !_.isStringNotEmpty(this.state.justCreatedId)
                                &&
                                <div className="rb-group_x">
                                    <div>
                                        RU: <input
                                        value={this.getEditModel().name}
                                        className="rb-wide"
                                        onChange={(e) => {
                                            this.getEditModel().name = e.target.value;
                                            this.forceUpdate();
                                        }}
                                    />
                                        DE: <input
                                        value={this.getEditModel().nameOriginal}
                                        className="rb-wide"
                                        onChange={(e) => {
                                            this.getEditModel().nameOriginal = e.target.value;
                                            this.forceUpdate();
                                        }}
                                    />
                                    </div>
                                    <div className="">
                                        <Selector
                                            value={this.getEditModel().condition}
                                            items={conditionEnum}
                                            onChange={(value) => {
                                                this.getEditModel().condition = value;
                                                this.forceUpdate();
                                            }}
                                        />
                                    </div>
                                    <div className="">
                                        <textarea onChange={(e) => {
                                            this.getEditModel().notes = e.target.value;
                                            this.forceUpdate();
                                        }}>
                                            {this.getEditModel().notes}
                                        </textarea>
                                    </div>
                                    {
                                        !editExisting
                                        &&
                                        <div className="">
                                            <Selector
                                                value={this.getEditModel().kind}
                                                items={kindEnum}
                                                multiple
                                                onChange={(value) => {
                                                    this.getEditModel().kind = value;
                                                    this.forceUpdate();
                                                }}
                                            />
                                        </div>
                                    }
                                    <div className="">
                                        <label>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    this.getEditModel().rebuilt = e.target.checked;
                                                    this.forceUpdate();
                                                }}
                                                checked={!!this.getEditModel().rebuilt}
                                            />
                                            Перестроен
                                        </label>
                                    </div>
                                    <div>
                                        <button className="button rb-margin-r_x" onClick={this.onUpdateObjectClick.bind(this)}>Сохранить</button>
                                        {
                                            editExisting
                                            &&
                                            <a href={`/view/${this.getEditModel().id}/basic/`} target="_blank" rel="noopener noreferrer">Посмотреть</a>
                                        }
                                    </div>
                                </div>
                            }
                        </Modal>
                    }
                </div>
            </div>
        );
    }
}
