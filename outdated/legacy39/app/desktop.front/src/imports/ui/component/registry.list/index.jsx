import React from 'react';
import RegistryListBase from '../registry.list.base';
import statusEnum from '../../../api/registry.object/enum/status.js';
// import Detail from '../registry.detail/index.jsx';
import RegistryListItem from './component/registry.list.item';
import File from "../../../api/file/entity/entity.client.js";
import EntityCollection from "../../../lib/base/entity-collection/index-client.js";

import './style.less';

export default class RegistryList extends RegistryListBase
{
    async getSelect() {
        return ['name', 'code', 'area', 'status', 'level', 'condition', 'photoId', 'locationDescription', 'nameOriginal'];
    }

    async getSort() {
        return {'name': 1};
    }

	async loadItems()
	{
		const data = await super.loadItems();
		
		// load images
		// todo: put this inside the result collection, with .populate()
		const fColl = new EntityCollection(File);
		let ids = [];
		data.forEach((item) => {
			ids = _.union(ids, item.getFileReferences());
			item.setFileCollection(fColl);
		});

		await fColl.pumpUp(ids);

		return data;
	}

    getRandomGloryMessage() {
        const messages = [
            'Великому Одину и сыну Его Тору',
            'Железному Человеку',
            'Спайдермену',
            'Дедпулу',
            'Невероятному Халку',
        ];

        return messages[_.random(0, messages.length - 1)];
    }

    getNoItemMessage()
    {
        if (this.getPreset() === this.getPresetEnum().KEY_DANGER) {
            return (
                <span>
                    {`Слава ${this.getRandomGloryMessage()}, таких объектов сейчас нет.`}
                </span>
            );
        } else {
            return (
                <span>
                    Таких объектов пока нет, но вы можете <a href={this.getApplication().getRegistryObjectUrl({id: 'new'})}>прийти и заявить</a>!
                </span>
            );
        }
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

    /**
     * Renders the component
     * @returns {XML}
     * @access protected
     */
    render()
    {
        const data = this.getData();
        let detail = false;
        let found = false;
        if (this.isReady())
        {
            detail = data.length === 1 && this.getPage() === 1;
            found = data.length > 0;
        }

        return (
            <div className="">
                {/*<div className="rb-margin-b_x2">*/}
                    {/*<div className="grid-x grid-margin-x">*/}
                        {/*<div className="cell medium-10">*/}
                            {/*<input*/}
                                {/*type="text"*/}
                                {/*placeholder="Поиск"*/}
                                {/*onKeyPress={this.onSearch.bind(this)}*/}
                                {/*ref={(ref) => { this._search = ref; }}*/}
                            {/*/>*/}
                        {/*</div>*/}
                        {/*<div className="cell medium-2">*/}
                            {/*<button*/}
                                {/*className="button rb-wide"*/}
                                {/*onClick={this.onSearchClick.bind(this)}*/}
                            {/*>*/}
                                {/*Найти*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {
                    this.isReady()
                    &&
                    <div className="">
                        {
                            found
                            &&
                            <div className="">
                                {/*{*/}
                                    {/*detail*/}
                                    {/*&&*/}
                                    {/*<Detail*/}
                                        {/*id={data[0].getId()}*/}
                                        {/*preview*/}
                                    {/*/>*/}
                                {/*}*/}
                                {
                                    // !detail
                                    // &&
                                    <div className="">
                                        {
                                            this.needPageNav()
                                            &&
                                            <div className="rb-padding-b_x2">
                                                {this.renderPageNav()}
                                            </div>
                                        }
                                        <div className="rb-margin-b_x">
                                            <div className="registry-list">
                                                {
                                                    data.map((item) => {
                                                        return (
                                                            <RegistryListItem
                                                                key={item.getId()}
                                                                data={item}
                                                            />
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        {
                                            this.needPageNav()
                                            &&
                                            <div className="rb-padding-t_x2">
                                                {this.renderPageNav()}
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {
                            !found
                            &&
                            <div className="rb-margin-t_x2">
                                {this.getNoItemMessage()}
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}
