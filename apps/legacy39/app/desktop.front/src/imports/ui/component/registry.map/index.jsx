import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RegistryListBase from '../registry.list.base/index.jsx';
import statusEnum from '../../../api/registry.object/enum/status.js';

import YandexMap from '../../component/map.yandex/index.jsx';

import './style.less';

export default class RegistryMap extends RegistryListBase
{
    async getSelect() {
        return ['status', 'location', 'name', 'nameOriginal'];
    }

    async getFilterConstant() {
        const constant = super.getFilterConstant() || {};
        constant.location = {$exists: true, $ne: []};

        return constant;
    }

    assignPageParameters(params)
    {
        // do nothing
        return _.clone(params);
    }

    getFindParameters() {
        return {
            returnArray: true,
        };
    }

    getPlaces() {
        if (!this.isReady()) {
            return null;
        }

        if (!this.getItemCache().places) {
            const places = [];
            const items = this.getItemCache().places = this.getData().filter(x => _.isArrayNotEmpty(x.location));
            items.forEach((item) => {
                item.location.forEach((location, i) => {
                    places.push({
                        type: 'O',
                        id: `${item._id}_${i}`,
                        geometry: {
                            type: 'Point',
                            coordinates: [location.lat, location.lng]
                        },
                        properties: {
                            empty: true,
                            balloonContentBody: ' ', // forcing fucking balloon to open
                        },
                    });
                });
            });

            this.getItemCache().places = places;
        }

        return this.getItemCache().places;
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

    renderBalloonLocation(item) {
        return (
            <div className="rb-f-size_x0p7">
                {item.getLocationNormalized().map((location) => {
                    return (
                        <span key={`${location.lat}_${location.lng}`}>{location.lat}, {location.lng}</span>
                    );
                })}
            </div>
        );
    }

    async onObjectInformationFetch(id)
    {
        if (_.isStringNotEmpty(id)) {
            id = id.split('_')[0];
            if (_.isStringNotEmpty(id)) {
                // FIND
                const item = await this.getEntity().findOne({
                    filter: {_id: id},
                    select: ['name', 'code', 'area', 'status', 'level', 'condition', 'photoId', 'location', 'nameOriginal'],
                });
                if (item) {
                    await item.populate();
                    const url = `${this.getApplication().getRegistryObjectUrl({id: item.getId()})}?backurl=${this.makeBackUrl()}`;

                    let photoStyle = {};
                    if (item.hasPhotoId() && item.getPhoto()) {
                        photoStyle = {backgroundImage: `url(${item.getPhoto().getAbsoluteURL('200/200/')})`};
                    }

                    return {
                        title: ReactDOMServer.renderToStaticMarkup(
                            <div className="">
                                <a href={url} className="rb-no-decoration" target="_blank">{item.getTitle()}</a>
                                {
                                    item.hasNameOriginal()
                                    &&
                                    <div className="registry-map__item-name-original">
                                        {item.getNameOriginal()}
                                    </div>
                                }
                            </div>
                        ),
                        body: ReactDOMServer.renderToStaticMarkup(
                            <div>
                                {
                                    item.hasPhoto()
                                    &&
                                    <a href={url} style={photoStyle} className="registry-map__item-image rb-margin-b_x0p5" target="_blank" />
                                }
                                <div className="rb-margin-b_x0p5">
                                    {
                                        item.hasCode()
                                        &&
                                        <b className="rb-margin-r_x0p5">
                                            {item.getCode()}
                                        </b>
                                    }
                                    <span
                                        className={`rb-margin-r_x0p5 rb-f-color_${this.getStatusColor(item)}`}
                                    >
                                        {item.getStatusDisplay()}
                                    </span>
                                    {
                                        item.hasLevelDefined()
                                        &&
                                        <span>
                                        {item.getLevelDisplay()}
                                    </span>
                                    }
                                </div>
                                {this.renderBalloonLocation(item)}
                            </div>
                        ),
                    };
                }
            }
        }

        return null;
    }

    getRandomMessage() {
        const messages = [
            'Карта прогревает двигатель...',
            'Карта регулирует зеркало заднего вида...',
            'Карта застегивает ремень безопасности...',
        ];

        return messages[_.random(0, messages.length - 1)];
    }

    /**
     * Renders the component
     * @returns {XML}
     * @access protected
     */
    render()
    {
        // const getPointData = index => {
        //     return {
        //         balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
        //         clusterCaption: 'placemark <strong>' + index + '</strong>',
        //     };
        // };
        //
        // const getPointOptions = () => {
        //     return {
        //         preset: 'islands#darkBlueIcon',
        //     };
        // };
        return (
            <div className="registry-map">
                <div className="registry-map__placeholder">
                    <div className="registry-map__placeholder-text">{this.getRandomMessage()}</div>
                </div>
                <YandexMap
                    center={[54.711374, 21.425965]}
                    zoom={9}
                    markers={this.getPlaces()}
                    clusterGreed={50}
                    onObjectInformationFetch={this.onObjectInformationFetch.bind(this)}
                />
            </div>
        );
    }
}
