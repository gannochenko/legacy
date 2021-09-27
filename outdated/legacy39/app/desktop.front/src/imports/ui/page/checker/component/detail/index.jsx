import React from 'react';
import BaseComponent from '../../../../../lib/base/component/component.jsx';
import RegistryObject from '../../../../../api/registry.object/entity/entity.client.js';
import conditionEnum from '../../../../../api/registry.object/enum/condition.js';
import kindEnum from '../../../../../api/registry.object/enum/kind.js';

import GoogleMap from '../../../../component/general/google-map';
import Selector from '../../../../component/general/etc/selector';

import './style.less';

export default class Checker extends BaseComponent
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
            this.loadData(props);
            this.setNext(props.id, this.state.ids);
            this._panMap = true;
            // if (this._map)
            // {
            //     this._map.
            // }
        }
    }

    componentDidUpdate()
    {
        // if (this._panMap)
        // {
        //     if (this._map)
        //     {
        //         this._map.panToFirst();
        //     }
        //     this._panMap = false;
        // }
    }

    componentDidMount()
    {
        const id = this.getId(this.props);
        if (!_.isStringNotEmpty(id))
        {
            this.loadIds().then((list) => {
                if (_.isArrayNotEmpty(list))
                {
                    FlowRouter.go(`/checker/${list[0]._id}`);
                }
            });
        }
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
        return this.getApplication().wait(RegistryObject.find({
            select: ['_id'],
            sort: {'name': 1},
            filter: {
                verified: {$ne: true},
            },
        }, {returnArray: true})).then((ids) => {
            this.setState({
                ids
            });
            return ids;
        }).catch((e) => {
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
        RegistryObject.getCount({verified: {$ne: true}}).then((res) => {
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

        this.getApplication().wait(RegistryObject.findOne({filter: {
            _id: this.getId(props),
        }, select: '#'})).then((item) => {
            if (item)
            {
                this.setData(item);
                if (!this.isPreview())
                {
                    this.setTitle(this.extractTitle(item.getName()));
                }
            }
            else
            {
                this.setData({});
                // this.setError('Not found');
            }
        }).catch((e) => {
            console.dir(e);
            // notify
            // this.setError(e.message);
        });
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
        const loc = this.getData().getLocationFirst();
        if (loc)
        {
            return loc;
        }

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
        this.save();
    }

    onMapMarkerClick(code, loc)
    {
        const d = this.getData();
        const newLoc = d.getLocation().filter((item) => {
            return item.lat !== loc.lat || item.lng !== loc.lng;
        });

        d.setLocation(newLoc);
        this.save();
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
        this.save();
    }

    onKindSelectorChange(value)
    {
        this.getData().setKind(value);
        this.save();
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
                this.save();
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

    save()
    {
        // todo: implement this.getData().save() and that is it!

        const d = this.getData();
        RegistryObject.save(d.getId(), {
            verified: d.getVerified(),
            kind: d.getKind(),
            condition: d.getCondition(),
            location: d.getLocation(),
            remarkable: d.getRemarkable(),
        }).then(() => {
            this.forceUpdate();
            this.loadCounter();
        });
    }

    onVerifiedClick()
    {
        const d = this.getData();
        d.setVerified(!d.getVerified());
        this.save();
    }

    onRemarkableClick()
    {
        const d = this.getData();
        d.setRemarkable(!d.getRemarkable());
        this.save();
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

        return (
            <div className="">
                <div className="registry-detail rb-group_x">
                    <div className="grid-x grid-margin-y grid-margin-x rb-margin-b_x2">
                        {
                            (title !== name) || this.isPreview()
                            &&
                            <div className="cell medium-4">
                                <div className="registry-detail__data">
                                    {name}
                                </div>
                            </div>
                        }
                        <div className="cell medium-4">
                            <div className="registry-detail__label">
                                Код/Id
                            </div>
                            <div className="registry-detail__data">
                                {item.getCode()} / <a href={`/registry/view/${item.getId()}/basic/`} target="_blank">{item.getId()}</a>
                            </div>
                        </div>
                        {
                            item.hasArea()
                            &&
                            <div className="cell medium-4">
                                <div className="registry-detail__label">
                                    Район
                                </div>
                                <div className="registry-detail__data">
                                    {item.getAreaDisplay()}
                                </div>
                            </div>
                        }
                        <div className="cell medium-4">
                            <div className="registry-detail__label">
                                Описание местоположения
                            </div>
                            <div className="registry-detail__data">
                                {item.getLocationDescription()}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="grid-x grid-margin-x">
                            <div className="cell large-6">
                                <div className="grid-y grid-margin-y">
                                    <div className="cell large-4">
                                        <Selector
                                            value={this.getData().getCondition()}
                                            items={conditionEnum}
                                            onChange={this.onConditionSelectorChange.bind(this)}
                                        />
                                    </div>
                                    <div className="cell large-6">
                                        <button
                                            className={`checker__button ${this.getData().getRemarkable() ? 'checker__button_selected' : ''}`}
                                            onClick={this.onRemarkableClick.bind(this)}
                                        >
                                            Выдающееся
                                        </button>
                                    </div>
                                    <div className="cell large-6">
                                        <button
                                            className={`checker__button ${this.getData().getVerified() ? 'checker__button_selected' : ''}`}
                                            onClick={this.onVerifiedClick.bind(this)}
                                        >
                                            Проверено (осталось {this.state.toVerify})
                                        </button>
                                    </div>
                                    <div className="cell large-2">
                                        <div className="rb-group_x">
                                            {
                                                _.isStringNotEmpty(this.state.pair.prev)
                                                &&
                                                <a href={`/checker/${this.state.pair.prev}/`} className="button">&lt; Назад</a>
                                            }
                                            {
                                                _.isStringNotEmpty(this.state.pair.next)
                                                &&
                                                <a href={`/checker/${this.state.pair.next}/`} className="button">Вперед &gt;</a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cell large-6">
                                <Selector
                                    value={this.getData().getKind()}
                                    items={kindEnum}
                                    onChange={this.onKindSelectorChange.bind(this)}
                                    multiple
                                />
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <input type="text" onKeyDown={this.onSearchKeyDown.bind(this)} />
                    </div>

                    <GoogleMap
                        center={this.getMapCenter()}
                        markers={this.getMarkers()}
                        onClick={this.onMapClick.bind(this)}
                        onMarkerClick={this.onMapMarkerClick.bind(this)}
                        onMarkersPainted={this.onMakersPainted.bind(this)}
                        enableSearch
                        language="ru"
                        ref={(ref) => { if(ref) { this._map = ref; } }}
                    />
                </div>
            </div>
        );
    }
}
