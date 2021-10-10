import React from 'react';
import PropTypes from 'prop-types';

import DataComponent from '../../../lib/base/data-component';
import RegistryObject from '../../../api/registry.object/entity/entity.client.js';
import File from "../../../api/file/entity/entity.client.js";
import EntityCollection from "../../../lib/base/entity-collection/index-client.js";

import './style.less';

export default class ObjectCardList extends DataComponent
{
    static propTypes = {
        className: PropTypes.oneOfType([
            PropTypes.string,
        ]),
        title: PropTypes.string,
        classNameTitle: PropTypes.string,
        filter: PropTypes.object,
        showAddButton: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        title: '',
        classNameTitle: '',
        filter: null,
        showAddButton: false,
    };

    async fetchData() {
        const items = await RegistryObject.find({
            filter: this.props.filter,
            select: {
                _id: 1,
                name: 1,
                photoId: 1,
            },
        });

	    // load images
	    // todo: put this inside the result collection, with .populate()
	    const fColl = new EntityCollection(File);
	    let ids = [];
	    items.forEach((item) => {
		    ids = _.union(ids, item.getFileReferences());
		    item.setFileCollection(fColl);
	    });

	    await fColl.pumpUp(ids);

        return items;
    }

    render()
    {
        if (!this.isReady())
        {
            return null;
        }

        const data = this.getData();

        if (!this.props.showAddButton && !_.isArrayNotEmpty(data)) {
            return null;
        }

        return (
            <div className={this.props.className}>
                <h2 className={`object-card-list__title ${this.props.classNameTitle || ''}`}>{this.props.title}</h2>
                    <div className="grid-x grid-margin-x grid-margin-y">
                        {
                            data.map((item) => {
                                const url = `${this.getApplication().getRegistryObjectUrl({id: item.getId()})}?backurl=${this.makeBackUrl()}`;

                                let photoStyle = {};
                                if (item.hasPhotoId() && item.getPhoto()) {
                                    photoStyle = {backgroundImage: `url(${item.getPhoto().getAbsoluteURL('400/400/')})`};
                                }

                                return (
                                    <div className="cell large-4 medium-6 small-12" key={item.getId()}>
                                        <a href={url} className="object-card-list__item">
                                            <div
                                                className="object-card-list__item-image"
                                                style={photoStyle}
                                            >
                                                {
                                                    !item.hasPhoto()
                                                    &&
                                                    <div className="object-card-list__item-image-dumb">
                                                        Здесь однажды появится фотография
                                                    </div>
                                                }
                                                <div className="object-card-list__item-title">
                                                    {item.getTitle()}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                );
                            })
                        }
                        {
                            this.props.showAddButton
                            &&
                            <div className="cell large-4 medium-6 small-12">
                                <a href={`/registry/view/new/basic/?backurl=${this.makeBackUrl()}`} className="object-card-list__item">
                                    <div
                                        className="object-card-list__item-add"
                                    >
                                        <div className="object-card-list__item-add-dumb">
                                            ДОБАВИТЬ ОБЪЕКТ
                                        </div>
                                    </div>
                                </a>
                            </div>
                        }
                    </div>

            </div>
        );
    }
}
