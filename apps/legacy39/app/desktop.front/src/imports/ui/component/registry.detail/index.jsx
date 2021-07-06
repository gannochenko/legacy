import React from 'react';
import DataComponent from '../../../lib/base/data-component/index.jsx';
import RegistryObject from '../../../api/registry.object/entity/entity.client.js';
import Draft from '../../../api/draft/entity/entity.client.js';
import User from '../../../api/user/entity/entity.client.js';

import statusEnum from '../../../api/registry.object/enum/status.js';
import levelEnum from '../../../api/registry.object/enum/level.js';
import kindEnum from '../../../api/registry.object/enum/kind.js';
import technologyEnum from '../../../api/registry.object/enum/technology.js';
import conditionEnum from '../../../api/registry.object/enum/condition.js';
import areaEnum from '../../../api/registry.object/enum/area.js';

import YandexMap from '../map.yandex/index.jsx';
import RichBlock from '../general/rich-block/index.jsx';
import EnumSelector from '../general/enum-selector/index.jsx';
import Modal from '../general/etc/modal/index.jsx';
import Question from '../general/etc/question/index.jsx';
import FilePicker from '../../../lib/util/uploader/ui/file-picker/index.jsx';
import DocumentList from './component/document-list/index.jsx';

import './style.less';

export default class RegistryDetail extends DataComponent
{
    constructor(props) {
        super(props);
        this.extendState({
            editMode: false,
            draftReady: false,
        });

        this.save = _.debounce(this.save.bind(this), 1000);
    }

	async loadData(props)
    {
        Promise.all([
            this.loadObject(props),
            this.loadDraft(props),
        ]);
	}

	async loadObject(props)
    {
	    if (this.isExisting(props))
	    {
		    this.getApplication().wait(RegistryObject.findOne({filter: {
		        _id: this.getId(props),
			}, select: '#'})).then((item) => {
				if (_.isObjectNotEmpty(item)) {
					return item.populate().then(() => {
						return item;
					});
				}
				
				return item;
		    }).then((item) => {
			    if (_.isObjectNotEmpty(item))
			    {
				    this.setData(item);
				    this.setTitle(item.getName());
			    }
			    else
			    {
				    this.setData({});
				    this.notifyUser('Не удалось получить данные');
			    }
		    }).catch((e) => {
			    console.dir(e);
			    this.notifyUser('Не удалось получить данные');
		    });
	    }
	    else
	    {
		    this.setData(new RegistryObject());
		    this.setTitle('Новый объект');
		    this.enterEditMode();
	    }
    }

    async loadDraft(props)
    {
        const item = await Draft.findOne({filter: {
            userId: User.getId(),
            objectId: this.isExisting(props) ? this.getId(props) : {$exists: false},
        }, select: '#'});

	    this.setState({
		    draftReady: true,
	    });

	    if (_.isObjectNotEmpty(item))
	    {
	    	const answer = await this.askUseDraft();

		    if (answer.code === 'Y')
		    {
			    await this.setDraft(item);
			    this.enterEditMode();
		    }
		    else
		    {
		    	const rResult = await item.remove();
		    	if (!rResult.isSuccess())
			    {
				    this.notifyUser('Не удалось удалить черновик');
			    }
		    }
	    }
    }

	async onMakePublicClick()
    {
    	const answer = await this.askPublish();
    	if (answer.code === 'Y')
	    {
		    const res = await this.updateFromDraft();
		    if (res.isSuccess())
		    {
			    const dRes = await this.removeDraft();
			    if (dRes && dRes.isSuccess())
			    {
			    	await this.getSource().populate();

				    this.toggleEditMode();
				    this.notifyUser('Изменения опубликованы', {lifeTime: 2000, closeable: false, code: 'saved'});

				    if (res.getId() !== this.getId())
				    {
					    // todo: use path information here
					    FlowRouter.go(`/view/${res.getId()}/basic/`);
				    }
			    }
                else
                {
                    this.notifyUser(`Не удалось удалить черновик: ${dRes ? dRes.getErrorFirst().message : 'Черновик не существует'}`, {type: 'error', lifeTime: 10000, closeable: true, code: 'not-saved'});
                }
		    }
		    else
            {
                this.notifyUser(`Ошибка сохранения: ${res.getErrorFirst().message}`, {type: 'error', lifeTime: 10000, closeable: true, code: 'not-saved'});
            }
	    }
    }

    onDeleteClick()
    {
        let title = this.getSource().getName();
        if (_.isStringNotEmpty(title) && title.length > 30) {
            title = `${title.substr(0, 29)}...`;
        }

        return Question.ask(
            `Удалить объект${_.isStringNotEmpty(title) ? ` "${title}"` : ''}? Эта операция не может быть отменена.`,
            {
                buttons: [
                    {
                        code: 'Y',
                        label: 'Да, удалить',
                    },
                    {
                        code: 'N',
                        label: 'Нет, отставить!',
                    },
                ],
            }
        ).then((res) => {
            if (res.code === 'Y') {
                return Promise.all([
                    this.getDraft() ? this.getDraft().remove() : Promise.resolve(),
                    this.getData().remove(),
                ]);
            }
        }).then(() => {
            FlowRouter.go('/');
        }).catch();
    }

    onEditModeClick()
    {
        this.toggleEditMode();
    }

    onRichAttributeChange(attr, html, text)
    {
        this.changeAttribute(attr, text);
    }

    onDiscreetAttributeChange(attr, value)
    {
        return this.changeAttribute(attr, value).then((res) => {
        	if (res)
	        {
		        this.forceUpdate();
	        }
        });
    }

    onMapClick(coords)
    {
        if (!this.isEditMode())
        {
            return;
        }

        const locs = this.getSource().extractLocation();
        locs.push({
            lat: coords[0],
            lng: coords[1],
        });

        this.onDiscreetAttributeChange('location', locs);
    }

    onMapMarkerClick(id)
    {
        if (!this.isEditMode())
        {
            return;
        }

        const locs = this.getSource().getLocation().filter((loc) => {
            return loc._id !== id;
        });

        this.onDiscreetAttributeChange('location', locs);
    }

    onUploaderClick()
    {
        Modal.open((
	        <FilePicker
		        onChange={this.onFileUploaded.bind(this)}
                onImportantProcessStart={() => {
                    const m = Modal.get();
                    if (m)
                    {
                        m.disableClose();
                    }
                }}
                onImportantProcessStop={() => {
                    const m = Modal.get();
                    if (m)
                    {
                        m.enableClose();
                    }
                }}
                imagesOnly
	        />
        ), {
        	maximizeHeight: true,
        });
    }

    onFileUploaded(id)
    {
        Modal.close();
        this.onDiscreetAttributeChange('photoId', id);
    }

	onToggleFavouriteClick()
	{
		if (!this.isExisting())
		{
			return;
		}

		const userId = User.get().getId();
		this.getData().toggleFavouriteFor(userId);
		if (this.isEditMode() && this.hasDraft())
		{
			this.getDraft().getPayload().toggleFavouriteFor(userId);
		}
		this.getData().save().then(() => {
			this.forceUpdate();
		});
	}

	onToggleDangerClick()
	{
		if (!this.isExisting())
		{
			return;
		}

		const danger = !this.isInDanger();
		this.getData().setInDanger(danger);
		if (this.isEditMode() && this.hasDraft())
		{
			this.getDraft().getPayload().setInDanger(danger);
		}
		this.getData().save().then(() => {
			this.forceUpdate();
		});
	}

    onToggleRemarkableClick()
    {
        this.getSource().setRemarkable(!this.getSource().getRemarkable());
        this.getSource().save().then(() => {
            this.forceUpdate();
        });
    }

    onToggleHiddenClick()
    {
        if (!this.isExisting())
        {
            return;
        }

        const pub = !this.getData().getHidden();
        this.getData().setHidden(pub);
        if (this.isEditMode() && this.hasDraft())
        {
            this.getDraft().getPayload().setHidden(pub);
        }
        this.getData().save().then((res) => {
            console.dir(res);
            this.forceUpdate();
        });
    }

	isInDanger()
	{
		return this.getData().getInDanger();
	}

	isInFavourite()
	{
	    if (!User.get()) {
	        return false;
        }

		return this.getData().isInFavouriteFor(User.get().getId());
	}

	isRemarkable()
    {
        return this.getSource().getRemarkable();
    }

    isHidden()
    {
        return this.getSource().getHidden();
    }

    toggleEditMode()
    {
	    this.setState({
		    editMode: !this.state.editMode,
	    });
    }

    enterEditMode()
    {
	    this.setState({
		    editMode: true,
	    });
    }

    getDraft()
    {
        if (!this.getCache().draft)
        {
            const draft = new Draft();
            draft.setUserId(User.getId());
            if (this.isExisting())
            {
	            draft.setObjectId(this.getId());
            }
            draft.setPayload(this.getData().clone());

	        this.getCache().draft = draft;
        }

        return this.getCache().draft;
    }

    async setDraft(draft)
    {
        if (_.isPlainObject(draft.getPayload()))
        {
        	const item = new RegistryObject(draft.getPayload());
        	await item.populate();

            draft.setPayload(item);
        }

        this.getCache().draft = draft;
    }

    hasDraft()
    {
		return !!this.getCache().draft;
    }

	async removeDraft()
    {
        const draft = this.getCache().draft;
	    this.getCache().draft = null;
        if (draft)
        {
            return await draft.remove();
        }

        return null;
    }

    async updateFromDraft()
    {
    	const item = this.getData();

    	// transfer the data stored inside the draft into an actual object
    	item.mergeData(this.getDraft().getPayload().getData());
    	return item.save();
    }

    getSource()
    {
    	return this.hasDraft() ? this.getDraft().getPayload() : this.getData();
    }

	publicationReady()
    {
        return this.getSource().hasName();
    }

    async changeAttribute(attr, value)
    {
        const fn = `set${_.uCFirst(attr)}`;
        const d = this.getDraft();
        const payload = d.getPayload();
        if (_.isFunction(payload[fn]))
        {
	        payload[fn](value);
            await payload.populate();
            await this.save();

            return true;
        }

        return false;
    }

    getDebounceTimeout()
    {
        return 100;
    }

    getId(props)
    {
        props = props || this.props;
        return props.id || '';
    }

    isExisting(props)
    {
        const id = this.getId(props);
        return _.isStringNotEmpty(id) && id !== 'new';
    }

    async save()
    {
        return this.getDraft().save().then((result) => {
        	if (result.isSuccess())
	        {
		        this.notifyUser('Черновик сохранен', {lifeTime: 2000, closeable: false, code: 'saved'});
		        this.forceUpdate();
	        }
            else
	        {
		        this.notifyUser('Данные не были сохранены. Возможно, отсутствует подключение к Интернету.', {
			        type: 'error',
			        closeable: true,
			        code: 'network_failure',
		        });
		        console.error(result.getErrors());
	        }
        });
    }

    isEditMode()
    {
        return this.state.editMode;
    }

    getStatusColor(item)
    {
        const s = item.getStatus();
        if (s === statusEnum.KEY_CLO)
        {
            return 'fresh-onion';
        }

        if (s === statusEnum.KEY_PRE_CLO)
        {
            return 'amber';
        }

        if (s === statusEnum.KEY_POTENTIAL_CLO)
        {
            return 'lynch';
        }

        if (s === statusEnum.KEY_REJECT)
        {
            return 'cochineal-red';
        }
    }

    getMapCenter()
    {
        const location = this.getSource().getLocationFirst();
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
        const item = this.getSource();
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
                });
            });
        }

        return places;
    }

    makeSectionUrl(section) {
        return `${this.getApplication().getRegistryObjectUrl({
            id: this.getId(),
            section
        })}?backurl=${this.getBackUrl(true)}`;
    }

    isSection(section) {
        return this.props.section === section;
    }

    isSectionBasic() {
        return this.isSection('basic');
    }

    isSectionNote() {
        return this.isSection('note');
    }

    isSectionMap() {
        return this.isSection('map');
    }

    getRandomMessage() {
        const messages = [
            'Карта прогревает двигатель...',
            'Карта регулирует зеркало заднего вида...',
            'Карта застегивает ремень безопасности...',
        ];

        return messages[_.random(0, messages.length - 1)];
    }

	isReady()
	{
		return this.state.draftReady && super.isReady();
	}

	async askUseDraft()
	{
		return Question.ask(
			this.isExisting()
			?
			'Вы не опубликовали изменения по объекту в прошлый раз, поэтому у вас остался черновик. Продолжить работу с ним?'
			:
			'Вы не завершили создание нового объекта в прошлый раз, поэтому у вас остался черновик. Продолжить работу с ним?',
			{
				buttons: [
					{
						code: 'Y',
						label: 'Да, продолжить',
					},
					{
						code: 'N',
						label: 'Нет, черновик можно удалить',
					},
				],
			}
		).catch();
	}

	async askPublish()
	{
		return Question.ask(
			'После публикации изменения увидят все пользователи, и данная операция не может быть отменена. Опубликовать изменения?',
			{
				buttons: [
					{
						code: 'Y',
						label: 'Да, все готово',
					},
					{
						code: 'N',
						label: 'Нет, пока рано',
					},
				],
			}
		).catch();
	}

	renderSectionMenu(items)
	{
		return items.map((item) => {
		    if (item.displayed === false) {
		        return null;
            }
			return (
				<a
					key={item.code}
					className={`pl-button ${this.isSection(item.code) ? '' : 'pl-button_inactive'}`}
					href={this.makeSectionUrl(item.code)}
				>
					{item.label}
				</a>
			);
		});
	}

    renderCoordinates() {
        const item = this.getSource();
        if (item.hasLocation()) {
            return (
                <div className="rb-group_x">
                    {item.getLocationNormalized().map((location) => {
                        return (
                            <span key={`${location.lat}_${location.lng}`}>{location.lat}, {location.lng}</span>
                        );
                    })}
                </div>
            );
        }

        return null;
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

        const item = this.getSource();

        let headerStyle = {backgroundImage: 'url(/img/konigsberg/1.jpg)'};
        // if (item.hasPhoto()) {
        //     headerStyle = {backgroundImage: `url(${item.getPhoto()})`};
        // }

        let photoStyle = {};
        if (item.hasPhotoId() && item.getPhoto()) {
            photoStyle = {backgroundImage: `url(${item.getPhoto().getAbsoluteURL('200/200/')})`};
        }

        return (
            <div className="">
                <div style={headerStyle} className="registry-detail__header">
                    <div className="registry-detail__header-buttons">
                        <a
                            className="pl-button pl-button_pale"
                            href={this.getBackUrl() || '/'}
                        >
                            <span className="rb-icon-label rb-icon-label_shrink rb-icon-code_arrow_back_ios">
	                            <span>
	                                Назад
	                            </span>
                            </span>
                        </a>
                        <div className="rb-group_x">
                            {
                                (this.isEditMode() && this.hasDraft() && this.publicationReady())
                                &&
	                            <button
		                            className="pl-button pl-button_patina"
		                            onClick={this.onMakePublicClick.bind(this)}
	                            >
                                    <span className="rb-icon-label rb-icon-label_shrink rb-icon-code_check_circle_outline">
                                        <span>
                                            Опубликовать
                                        </span>
                                    </span>
	                            </button>
                            }

                            {
                                !!User.isEditor()
                                &&
                                <button
                                    className={`pl-button ${this.isEditMode() ? 'pl-button_red' : 'pl-button_pale'}`}
                                    onClick={this.onEditModeClick.bind(this)}
                                >
                                    <span className="rb-icon-label rb-icon-label_shrink rb-icon-code_mode-edit">
                                        <span>
                                            Режим редактирования
                                        </span>
                                    </span>
                                </button>
                            }

                            {
                                (!!User.isEditor() && this.isExisting())
                                &&
                                <button
                                    className="pl-button pl-button_red"
                                    onClick={this.onDeleteClick.bind(this)}
                                >
                                    <span className="rb-icon-label rb-icon-label_shrink rb-icon-code_delete-forever">
                                        <span>
                                            Удалить
                                        </span>
                                    </span>
                                </button>
                            }
                        </div>
                    </div>
                    <div className="registry-detail__header-right">
                        <div className="registry-detail__header-title">
                            <RichBlock
                                value={item.getTitle()}
                                placeholder="Введите название..."
                                editMode={this.isEditMode()}
                                onChange={this.onRichAttributeChange.bind(this, 'name')}
                                debounce={this.getDebounceTimeout()}
                            />
                        </div>
                        {
                            (this.isEditMode() || item.hasNameOriginal())
                            &&
                            <div className="registry-detail__header-name-origin rb-margin-t_x0p5">
                                <RichBlock
                                    value={item.getNameOriginal()}
                                    placeholder="Введите немецкое название..."
                                    editMode={this.isEditMode()}
                                    onChange={this.onRichAttributeChange.bind(this, 'nameOriginal')}
                                    debounce={this.getDebounceTimeout()}
                                />
                            </div>
                        }
                    </div>
                    <div className="registry-detail__header-photo-frame">
                        <div style={photoStyle} className="registry-detail__header-photo-canvas">
                            {
                                !item.hasPhotoId()
                                &&
                                <span className="registry-detail__header-photo-placeholder">Здесь однажды появится фотография</span>
                            }
                        </div>
                        {
                            this.isEditMode()
                            &&
                            <button
                                className="registry-detail__header-photo-upload"
                                onClick={this.onUploaderClick.bind(this)}
                            />
                        }
                    </div>
                </div>

                <div className="registry-detail__panel">
                    <div className="rb-group_x">

                        { /* favourite */ }
                        {
                            !!User.get()
                            &&
                            <button
                                className={`${this.isInFavourite() ? 'registry-detail__remove-favorites' : 'registry-detail__add-favorites'} ${!this.isExisting() ? 'registry-detail__action_disabled' : ''}`}
                                onClick={this.onToggleFavouriteClick.bind(this)}
                            >
                                {
                                    this.isInFavourite()
                                    &&
                                    <span>Убрать из избранного</span>
                                }
                                {
                                    (!this.isInFavourite())
                                    &&
                                    <span>Добавить в избранное</span>
                                }
                            </button>
                        }

                        { /* alert */ }
                        {/*{*/}
                            {/*!!User.isEditor()*/}
                            {/*&&*/}
                            {/*<button*/}
                                {/*className={`${this.isInDanger() ? 'registry-detail__in-danger' : 'registry-detail__in-danger_not'} ${!this.isExisting() ? 'registry-detail__action_disabled' : ''}`}*/}
                                {/*onClick={this.onToggleDangerClick.bind(this)}*/}
                            {/*>*/}
                                {/*{*/}
                                    {/*this.isInDanger()*/}
                                    {/*&&*/}
                                    {/*<span>Отбой тревоги</span>*/}
                                {/*}*/}
                                {/*{*/}
                                    {/*(!this.isInDanger())*/}
                                    {/*&&*/}
                                    {/*<span>Поднять тревогу</span>*/}
                                {/*}*/}
                            {/*</button>*/}
                        {/*}*/}

                        { /* remarkable */ }
                        {
                            !!User.isEditor()
                            &&
                            <button
                                className={`${this.isRemarkable() ? 'registry-detail__is-remarkable' : 'registry-detail__is-remarkable_not'}`}
                                onClick={this.onToggleRemarkableClick.bind(this)}
                            >
                                {
                                    this.isRemarkable()
                                    &&
                                    <span>Снять отметку</span>
                                }
                                {
                                    (!this.isRemarkable())
                                    &&
                                    <span>Отметить как выдающийся</span>
                                }
                            </button>
                        }
                        {
                            !User.get()
                            &&
                            <div
                                className={`${this.isRemarkable() ? 'registry-detail__is-remarkable' : 'registry-detail__is-remarkable_not'}`}
                            >
                                {
                                    this.isRemarkable()
                                    &&
                                    <span>Выдающийся объект</span>
                                }
                                {
                                    (!this.isRemarkable())
                                    &&
                                    <span>Обычный объект</span>
                                }
                            </div>
                        }

                        { /* hidden */ }
                        {
                            !!User.isEditor()
                            &&
                            <button
                                className={`${this.isHidden() ? 'registry-detail__is-hidden' : 'registry-detail__is-hidden_not'}`}
                                onClick={this.onToggleHiddenClick.bind(this)}
                            >
                                {
                                    this.isHidden()
                                    &&
                                    <span>Сделать объект видимым</span>
                                }
                                {
                                    (!this.isHidden())
                                    &&
                                    <span>Сделать объект скрытым</span>
                                }
                            </button>
                        }
                    </div>
                </div>

	            <div className="registry-detail__container">
		            <div className="rb-margin-b_x">
			            <div className="rb-group_x">
				            {this.renderSectionMenu([
					            {code: 'basic', label: 'Информация'},
					            {code: 'map', label: 'Карта'},
					            {code: 'note', label: 'Заметки', displayed: this.isEditMode() || item.hasNote()},
					            {code: 'document', label: 'Документы', displayed: !!User.isEditor() && (this.isEditMode() || item.hasDocument())},
				            ])}
			            </div>
		            </div>

		            <div className="registry-detail">
			            {
				            this.isSectionBasic()
				            &&
				            <div className="grid-x grid-margin-x grid-margin-y">
					            {
						            (item.hasStatus() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Статус
							            </div>
							            <div className="registry-detail__data">
								            <EnumSelector
									            display={
										            item.getStatus()
											            ?
											            <span className={`rb-f-color_${this.getStatusColor(item)}`}>
                                                    {item.getStatusDisplay()}
                                                </span>
											            :
											            null
									            }
									            value={item.extractStatus()}
									            items={statusEnum}
									            editMode={this.isEditMode()}
									            onChange={this.onDiscreetAttributeChange.bind(this, 'status')}
									            multiple={false}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasLevel() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Значимость
							            </div>
							            <div className="registry-detail__data">
								            <EnumSelector
									            display={item.getLevelDisplay()}
									            value={item.extractLevel()}
									            items={levelEnum}
									            editMode={this.isEditMode()}
									            onChange={this.onDiscreetAttributeChange.bind(this, 'level')}
									            multiple={false}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasKind() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Тип
							            </div>
							            <div className="registry-detail__data">
								            <EnumSelector
									            display={item.hasKind() ? item.getKindDisplay().join(', ') : null}
									            value={item.extractKind()}
									            items={kindEnum}
									            editMode={this.isEditMode()}
									            onChange={this.onDiscreetAttributeChange.bind(this, 'kind')}
								            />
							            </div>
						            </div>
					            }

                                {
                                    (item.hasTechnology() || this.isEditMode())
                                    &&
                                    <div className="cell large-4 medium-6">
                                        <div className="registry-detail__label">
                                            Технология
                                        </div>
                                        <div className="registry-detail__data">
                                            <EnumSelector
                                                display={item.hasTechnology() ? item.getTechnologyDisplay().join(', ') : null}
                                                value={item.extractTechnology()}
                                                items={technologyEnum}
                                                editMode={this.isEditMode()}
                                                onChange={this.onDiscreetAttributeChange.bind(this, 'technology')}
                                            />
                                        </div>
                                    </div>
                                }

					            {
						            (item.hasCondition() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Состояние
							            </div>
							            <div className="registry-detail__data">
								            <EnumSelector
									            display={
										            item.getConditionDisplay()
									            }
									            value={item.extractCondition()}
									            items={conditionEnum}
									            editMode={this.isEditMode()}
									            onChange={this.onDiscreetAttributeChange.bind(this, 'condition')}
									            multiple={false}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasArea() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Район
							            </div>
							            <div className="registry-detail__data">
								            <EnumSelector
									            display={item.hasArea() ? item.getAreaDisplay() : null}
									            value={item.extractArea()}
									            items={areaEnum}
									            editMode={this.isEditMode()}
									            onChange={this.onDiscreetAttributeChange.bind(this, 'area')}
									            multiple={false}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasLocationDescription() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Местоположение
							            </div>
							            <div className="registry-detail__data">
								            <RichBlock
									            value={item.getLocationDescription()}
									            placeholder="Опишите местоположение..."
									            editMode={this.isEditMode()}
									            onChange={this.onRichAttributeChange.bind(this, 'locationDescription')}
									            debounce={this.getDebounceTimeout()}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasCreationPeriod() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Время возникновения
							            </div>
							            <div className="registry-detail__data">
								            <RichBlock
									            value={item.getCreationPeriod()}
									            placeholder="Указать период..."
									            editMode={this.isEditMode()}
									            onChange={this.onRichAttributeChange.bind(this, 'creationPeriod')}
									            debounce={this.getDebounceTimeout()}
								            />
							            </div>
						            </div>
					            }

                                {
                                    (item.hasTearDownPeriod() || this.isEditMode())
                                    &&
                                    <div className="cell large-4 medium-6">
                                        <div className="registry-detail__label">
                                            Время утраты
                                        </div>
                                        <div className="registry-detail__data">
                                            <RichBlock
                                                value={item.getTearDownPeriod()}
                                                placeholder="Указать период..."
                                                editMode={this.isEditMode()}
                                                onChange={this.onRichAttributeChange.bind(this, 'tearDownPeriod')}
                                                debounce={this.getDebounceTimeout()}
                                            />
                                        </div>
                                    </div>
                                }

					            {
						            (false && (item.hasOriginDate() || this.isEditMode()))
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Дата добавления в реестр ОКН
							            </div>
							            <div className="registry-detail__data">
								            <RichBlock
									            value={item.getOriginDateDisplay()}
									            placeholder="Указать дату..."
									            editMode={this.isEditMode()}
									            onChange={this.onRichAttributeChange.bind(this, 'originDate')}
									            debounce={this.getDebounceTimeout()}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasCode() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Код в реестре ОКН
							            </div>
							            <div className="registry-detail__data">
								            <RichBlock
									            value={item.getCode()}
									            placeholder="Указать код..."
									            editMode={this.isEditMode()}
									            onChange={this.onRichAttributeChange.bind(this, 'code')}
									            debounce={this.getDebounceTimeout()}
								            />
							            </div>
						            </div>
					            }

					            {
						            (item.hasDocumentName() || this.isEditMode())
						            &&
						            <div className="cell large-4 medium-6">
							            <div className="registry-detail__label">
								            Документ
							            </div>
							            <div className="registry-detail__data">
								            <RichBlock
									            value={item.getDocumentName()}
									            placeholder="Указать документ..."
									            editMode={this.isEditMode()}
									            onChange={this.onRichAttributeChange.bind(this, 'documentName')}
									            debounce={this.getDebounceTimeout()}
								            />
							            </div>
						            </div>
					            }

                                {
                                    (item.hasArchitect() || this.isEditMode())
                                    &&
                                    <div className="cell large-4 medium-6">
                                        <div className="registry-detail__label">
                                            Архитектор
                                        </div>
                                        <div className="registry-detail__data">
                                            <RichBlock
                                                value={item.getArchitect()}
                                                placeholder="Указать архитектора..."
                                                editMode={this.isEditMode()}
                                                onChange={this.onRichAttributeChange.bind(this, 'architect')}
                                                debounce={this.getDebounceTimeout()}
                                            />
                                        </div>
                                    </div>
                                }

                                {
                                    (item.hasLocation() && !this.isEditMode())
                                    &&
                                    <div className="cell large-4 medium-6">
                                        <div className="registry-detail__label">
                                            Координаты
                                        </div>
                                        <div className="registry-detail__data">
                                            {this.renderCoordinates()}
                                        </div>
                                    </div>
                                }
				            </div>
			            }
			            {
				            this.isSectionNote()
				            &&
				            <div className="registry-detail__note">
					            <RichBlock
						            value={item.getNote()}
						            placeholder="Введите текст заметки..."
						            editMode={this.isEditMode()}
						            onChange={this.onRichAttributeChange.bind(this, 'note')}
						            debounce={this.getDebounceTimeout()}
					            />
					            {
						            (!this.isEditMode() && !item.hasNote())
						            &&
						            <span>По данному объекту заметок пока нет.</span>
					            }
				            </div>
			            }
			            {
				            this.isSectionMap()
				            &&
				            <div className="rb-relative">
					            <div className="registry-detail__map-placeholder">
						            <div className="registry-detail__map-placeholder-text">{this.getRandomMessage()}</div>
					            </div>
					            <YandexMap
						            center={this.getMapCenter()}
						            zoom={this.getData().hasLocation() ? 17 : 9}
						            markers={this.getPlaces()}
						            openBalloon={false}
						            onClick={this.onMapClick.bind(this)}
						            onMarkerClick={this.onMapMarkerClick.bind(this)}
					            />
				            </div>
			            }
			            {
                            (this.isSection('document') && !!User.isEditor())
				            &&
				            <div className="registry-detail__note">
					            <DocumentList
						            source={this.getSource()}
						            editMode={this.isEditMode()}
						            onChange={this.onDiscreetAttributeChange.bind(this, 'document')}
						            debounceTimeout={this.getDebounceTimeout()}
					            />
				            </div>
			            }
		            </div>
	            </div>
            </div>
        );
    }
}
