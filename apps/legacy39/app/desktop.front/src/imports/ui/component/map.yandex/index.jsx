import React from 'react';

import BaseComponent from '../../../lib/base/component/component.jsx';
import Util from '../../../lib/util.js';
import Option from '../../../api/option/entity/entity.client.js';

import PropTypes from 'prop-types';

import './style.less';

// https://tech.yandex.com/maps/jsbox/2.1/object_manager

export default class MapYandex extends BaseComponent
{
    static propTypes = {
        className: PropTypes.string,
        center: PropTypes.array,
        zoom: PropTypes.number,
        markers: PropTypes.array,
        // onMapLocationClick: PropTypes.func,
        // onMarkerDragEnd: PropTypes.func,
        onMarkerClick: PropTypes.func,
        onMarkersPainted: PropTypes.func,
        onObjectInformationFetch: PropTypes.func,
        onClick: PropTypes.func,
        language: PropTypes.string,
        openBalloon: PropTypes.bool,

        clusterGreed: PropTypes.number,
    };

    static defaultProps = {
        className: '',
        center: [54.711374, 21.425965],
        zoom: 9,
        markers: [],
        // onMapLocationClick: null,
        // onMarkerDragEnd: null,
        onMarkerClick: null,
        onMarkersPainted: null,
        onObjectInformationFetch: null,
        onClick: null,
        language: 'ru_RU',
        openBalloon: true,
        clusterGreed: 70,
    };

    _mapContainer = null;
    _markers = {};
    _markerIds = [];
    _oManager = null;
    _map = null;

    componentDidMount()
    {
        this.loadJs().then(() => {
            return this.createMapObject();
        }).then(() => {
            this.updateMarkers(this.props.markers);
        }).catch(() => {
            // todo: NOTIF
        });
    }

    componentWillReceiveProps(props)
    {
        if ('markers' in props && !_.deepEqual(props.markers, this.props.markers))
        {
            this.updateMarkers(props.markers);
        }
    }

    componentWillUnmount()
    {
        if (this._map)
        {
	        this._oManager.objects.balloon.events.remove('open',  this._onObjectBalloonOpen);
	        this._map.events.remove('click', this._onMapClick);
	        this._map.events.remove('click', this._onMarkerClick);
	        this._map.destroy();
        }

        this._mapContainer = null;
        this._map = null;
        this._oManager = null;
    }

    onMapClick(e)
    {
        const coords = e.get('coords');
        this.props.onClick(coords);
        // this.props.onClick({
        //     lat: coords[0], //.toPrecision(6),
        //     lng: coords[1], // .toPrecision(6)
        // })
    }

    panTo(loc) {
        if (_.isObjectNotEmpty(loc)) {
            this._map.panTo([loc.lat, loc.lng]);
        }
    }

    panToFirst()
    {
        if (_.isObjectNotEmpty(this._markers))
        {
            const pos = this._markers[Object.keys(this._markers)[0]].ref.getPosition();
            const nPos = [pos.lat(), pos.lng()];
            this._map.panTo(nPos);
        }
    }

    getMapUrl()
    {
        return `https://api-maps.yandex.ru/2.1/?lang=${this.props.language}`;
    }

    getMap()
    {
        return this._map;
    }

    // onMarkerDragEnd(code)
    // {
    //     const pos = this._markers[code].ref.getPosition();
    //     const nPos = {lat: pos.lat(), lng: pos.lng()};
    //     this._markers[code].location = nPos;
    //
    //     this.props.onMarkerDrag(code, nPos);
    // }

    onMarkerClick(e)
    {
        const objectId = e.get('objectId');
        const object = this._oManager.objects.getById(objectId);

        if (object)
        {
            this.props.onMarkerClick(object.id, object.geometry.coordinates);
        }
    }

    updateMarkers(markers)
    {
        if (!this._oManager || !_.isArray(markers)) {
            return;
        }

        const toRemoveIds = _.difference(this._markerIds, _.pluck(markers, 'id'));
        if (_.isArrayNotEmpty(toRemoveIds)) {
            this._oManager.remove(toRemoveIds);
        }

        this._oManager.add(_.isArray(markers) ? markers : []);

        this.fire('markers-updated', [], this);
        if (_.isFunction(this.props.onMarkersPainted))
        {
            this.props.onMarkersPainted();
        }

        this._markerIds = _.pluck(markers, 'id');
    }

    /**
     * See https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/objectManager.Balloon-docpage/
     * @param e
     */
    onObjectBalloonOpen(e)
    {
        const objectId = e.get('objectId');
        const object = this._oManager.objects.getById(objectId);

        if (object && object.properties && object.properties.empty) {

            // put a loader
            // todo: make this with a timeout
            object.properties = {
                balloonContentBody: 'Загружаем...',
            };
            this._oManager.objects.balloon.setData(object);

            this.props.onObjectInformationFetch(objectId).then((data) => {
                if (_.isObjectNotEmpty(data))
                {
                    object.properties = {
                        balloonContentHeader: data.title || '',
                        balloonContentBody: data.body || '',
                        // balloonContentFooter: '',
                        // clusterCaption: 'Cluster',
                        // hintContent: 'Hint',
                    };
                    this._oManager.objects.balloon.setData(object);
                }
            });
        }
    }

    createMapObject()
    {
        return new Promise((resolve) => {
            const params = {
                zoom: parseInt(this.props.zoom, 10),
            };
            if (_.isObjectNotEmpty(this.props.center))
            {
                params.center = this.props.center;
            }

            params.behaviors = ['dblClickZoom', 'drag', 'scrollZoom'];
            params.controls = [
                'fullscreenControl',
                'geolocationControl',
                'searchControl',
                'typeSelector',
                'zoomControl',
                'rulerControl',
            ];

            const map = new ymaps.Map(this._mapContainer, params, {});

            const manager = new ymaps.ObjectManager({
                // Setting an option to make placemarks start clusterizing.
                clusterize: true,
                // ObjectManager accepts the same options as the clusterer.
                gridSize: this.props.clusterGreed,
                clusterDisableClickZoom: true
            });
            manager.objects.options.set('preset', 'islands#blackIcon');
            manager.clusters.options.set('preset', 'islands#invertedBlackClusterIcons');
            manager.clusters.options.set('hasBalloon', false);
            map.geoObjects.add(manager);

            if (_.isFunction(this.props.onObjectInformationFetch))
            {
                this._onObjectBalloonOpen = this.onObjectBalloonOpen.bind(this);
                manager.objects.balloon.events.add('open',  this._onObjectBalloonOpen);
            }

            if (_.isFunction(this.props.onMarkerClick))
            {
                this._onMarkerClick = this.onMarkerClick.bind(this);
                manager.objects.events.add('click',  this._onMarkerClick);
            }

            if (_.isFunction(this.props.onClick))
            {
                this._onMapClick = this.onMapClick.bind(this);
                map.events.add('click', this._onMapClick);
            }

            this._map = map;
            this._oManager = manager;

            // todo: some event to resolve the promise on???
            resolve();
        });
    }

    loadJs() {
        return Util.loadJs(this.getMapUrl()).then(() => {
            return new Promise((resolve) => {
                ymaps.ready(resolve);
            });
        });
    }

    render()
    {
        // todo:
        // see https://gribnoysup.github.io/react-yandex-maps/#/sandbox/controls/listbox
        return (
            <div
                className={`yandex-map ${this.getClassName()}`}
                ref={ ref => {this._scope = ref; }}
            >
                <div
                    className="yandex-map__container"
                    ref={(instance) => {this._mapContainer = instance}}
                />
            </div>
        );
    }
}
