import React from 'react';
import statusEnum from '../../../../../api/registry.object/enum/status.js';
import BaseComponent from '../../../../../lib/base/component/component.jsx';

import './style.less';

export default class RegistryListItem extends BaseComponent
{
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

    getData()
    {
        return this.props.data;
    }

    /**
     * Renders the component
     * @returns {XML}
     * @access protected
     */
    render()
    {
        const item = this.getData();
        const url = `${this.getApplication().getRegistryObjectUrl({id: item.getId()})}?backurl=${this.makeBackUrl()}`;

        let photoStyle = {};
        if (item.hasPhotoId() && item.getPhoto())
        {
            photoStyle = {backgroundImage: `url(${item.getPhoto().getAbsoluteURL('400/400/')})`};
        }

        return (
            <div
                key={item.getId()}
                className="registry-list-item grid-x grid-margin-x"
            >
                <div className="registry-list-item__left cell small-12 medium-4 large-3">
                    <a
                        className="registry-list-item__image"
                        style={photoStyle}
                        href={url}
                    >
                        {
                            !item.hasPhoto()
                            &&
                            <div className="registry-list-item__image-dumb">
                                Здесь однажды появится фотография
                            </div>
                        }
                    </a>
                </div>
                <div className="registry-list-item__right cell small-12 medium-8 large-9">
                    <div className="registry-list-item__name">
                        <a href={url}>
                            {item.getTitle()}
                        </a>
                    </div>
                    {
                        item.hasNameOriginal()
                        &&
                        <div className="registry-list-item__name-original">
                            {item.getNameOriginal()}
                        </div>
                    }
                    <div className="rb-margin-t_x0p5">
                        <div className="registry-list-item__data rb-group_x0p5">
                            {
                                item.hasCode()
                                &&
                                <div className="registry-list-item__attribute registry-list-item__code">
                                    {item.getCode()}
                                </div>
                            }
                            <div className={`registry-list-item__attribute registry-list-item__status rb-f-color_${this.getStatusColor(item)}`}>
                                {item.getStatusDisplay()}
                            </div>
                            {
                                item.hasLevelDefined()
                                &&
                                <div className="registry-list-item__attribute">
                                    {item.getLevelDisplay()}
                                </div>
                            }
                            {
                                item.hasConditionDefined()
                                &&
                                <div className="registry-list-item__attribute">
                                    {`Состояние: ${item.getConditionDisplay().toLowerCase()}`}
                                </div>
                            }
                        </div>
                        {
                            (item.hasArea() || item.hasLocationDescription())
                            &&
                            <div className="registry-list-item__area">
                                {[item.getAreaDisplay(), item.getLocationDescription()].join(', ')}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
