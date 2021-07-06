import React, { forwardRef, FC } from 'react';
import { YMaps, Map as YMap, Placemark, ZoomControl } from 'react-yandex-maps';

import { MapPropsType } from './type';
import { MapRoot } from './style';
import { useMap } from './hooks/useMap';

export const Map: FC<MapPropsType> = forwardRef(function Map(props, ref) {
    const {
        rootProps,
        mapProps,
        placeMarks,
        hasPlaceMarks,
        zoomControlProps,
    } = useMap(ref, props);

    if (!hasPlaceMarks) {
        return null;
    }

    // можно заюзать hydrate, как тут: https://codesandbox.io/s/m584w8n7o9?file=/src/index.js
    return (
        <MapRoot {...rootProps}>
            <YMaps>
                <YMap {...mapProps}>
                    {placeMarks.map((placeMarkData) => (
                        <Placemark {...placeMarkData} key={placeMarkData.id} />
                    ))}
                    <ZoomControl {...zoomControlProps} />
                </YMap>
            </YMaps>
        </MapRoot>
    );
});

Map.defaultProps = {
    height: '20rem',
};
