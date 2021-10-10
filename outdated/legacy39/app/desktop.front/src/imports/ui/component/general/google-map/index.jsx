import React from 'react';

import BaseComponent from '../../../../lib/base/component/component.jsx';
import Util from '../../../../lib/util.js';
import Option from '../../../../api/option/entity/entity.client.js';

import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';

import './style.less';

/**
 * if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 }
 */
export default class GoogleMap extends BaseComponent
{
    static propTypes = {
        className: PropTypes.string,
        center: PropTypes.object,
        zoom: PropTypes.number,
        markers: PropTypes.array,
        onMapLocationClick: PropTypes.func,
        onMarkerDragEnd: PropTypes.func,
        onMarkerClick: PropTypes.func,
        onMarkersPainted: PropTypes.func,
        onClick: PropTypes.func,
        language: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        center: {lat: 54.714187, lng: 20.581439},
        zoom: 14,
        markers: [],
        onMapLocationClick: null,
        onMarkerDragEnd: null,
        onMarkerClick: null,
        onMarkersPainted: null,
        onClick: null,
        language: 'en',
    };

    _mapContainer = null;
    _markers = {};

    constructor(props)
    {
        super(props);
        // this.extendState({
        // });
    }

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
        if ('markers' in props && !deepEqual(props.markers, this.props.markers))
        {
            this.updateMarkers(props.markers);
        }
    }

    componentWillUnmount()
    {
        google.maps.event.clearInstanceListeners(this.getMap());
    }

    panToFirst()
    {
        if (_.isObjectNotEmpty(this._markers))
        {
            const pos = this._markers[Object.keys(this._markers)[0]].ref.getPosition();
            const nPos = {lat: pos.lat(), lng: pos.lng()};
            this._map.panTo(nPos);
        }
    }

    getKey()
    {
        const key = Option.findOnePublished({name: 'vendor.google.map.key'});
        if (key && _.isStringNotEmpty(key.getValue()))
        {
            return key.getValue();
        }

        return '';
    }

    getMapUrl()
    {
        const key = this.getKey();
        return `https://maps.googleapis.com/maps/api/js?v=3&key=${key}&libraries=geometry,drawing,places&language=${this.props.language}`;
    }

    getMap()
    {
        return this._map;
    }

    onMarkerDragEnd(code)
    {
        const pos = this._markers[code].ref.getPosition();
        const nPos = {lat: pos.lat(), lng: pos.lng()};
        this._markers[code].location = nPos;

        this.props.onMarkerDrag(code, nPos);
    }

    onMarkerClick(code)
    {
        this.props.onMarkerClick(code, this._markers[code].location);
    }

    onMapClick(e)
    {
        this.props.onClick({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }

    updateMarkers(markers)
    {
        markers = _.isArray(markers) ? markers : [];

        // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        // icon: image

        const prevCodes = Object.keys(this._markers);
        const actualCodes = [];

        markers.forEach((marker) => {
            if (marker.code in this._markers)
            {
                const prev = this._markers[marker.code];
                if (prev.location.lat !== marker.location.lat || prev.location.lng !== marker.location.lng)
                {
                    // update
                    prev.ref.setPosition(marker.location);
                    prev.location = marker.location;

                    // this._map.panTo( marker.location );
                    // this._map.setCenter(m.getPosition());
                }
            }
            else
            {
                const ref = new google.maps.Marker({
                    position: marker.location,
                    map: this._map,
                    draggable: true,
                });

                if (_.isFunction(this.props.onMarkerDragEnd))
                {
                    ref.addListener('dragend', this.onMarkerDragEnd.bind(this, marker.code));
                }
                if (_.isFunction(this.props.onMarkerClick))
                {
                    ref.addListener('click', this.onMarkerClick.bind(this, marker.code));
                }

                this._markers[marker.code] = {
                    location: _.clone(marker.location),
                    ref,
                };
            }

            actualCodes.push(marker.code);
        });

        const removed = _.difference(prevCodes, actualCodes);
        if (_.isArrayNotEmpty(removed))
        {
            removed.forEach((code) => {
                this._markers[code].ref.setMap(null);
                google.maps.event.clearInstanceListeners(this._markers[code].ref);
                delete this._markers[code];
            });
        }

        this.fire('markers-updated', [], this);
        if (_.isFunction(this.props.onMarkersPainted))
        {
            this.props.onMarkersPainted();
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

            this._map = new google.maps.Map(this._mapContainer, params);
            const m = this.getMap();
            m.addListener('tilesloaded', () => {
                resolve();
            });

            if (_.isFunction(this.props.onClick))
            {
                m.addListener('click', this.onMapClick.bind(this));
            }

            // if (this.props.enableSearch)
            // {
            //     // Create the search box and link it to the UI element.
            //     const input = document.getElementById('pac-input');
            //     const searchBox = new google.maps.places.SearchBox(input);
            //     m.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            //
            //     // Bias the SearchBox results towards current map's viewport.
            //     m.addListener('bounds_changed', function() {
            //         searchBox.setBounds(m.getBounds());
            //     });
            // }
        });
    }

    loadJs() {
        return Util.loadJs(this.getMapUrl());
    }

    render()
    {
        return (
            <div
                className={`google-map ${this.getClassName()}`}
                ref={ ref => {this._scope = ref; }}
            >
                <div
                    className="google-map__container"
                    ref={(instance) => {this._mapContainer = instance}}
                >
                    Loading...
                </div>
            </div>
        );
    }
}
