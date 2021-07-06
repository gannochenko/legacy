import { Ref, useMemo } from 'react';
import { MapItemType, MapPropsType } from '../type';
import { MapState } from 'react-yandex-maps';
import { parseLocation } from '../utils/parseLocation';
import { KGD_CENTER, PLACE_MARK_MODULES } from '../constants';
import { fillTemplate, BUILDING_DETAIL } from '../../../pathTemplates';
import { extractImageMiniature } from '../utils/extractImageMiniature';

export const useMap = (
    ref: Ref<unknown>,
    { location, edges, height, ...props }: MapPropsType,
) => {
    const locations = useMemo(() => {
        let result: MapItemType[] = [];

        if (location) {
            const parsedLocation = parseLocation(location);

            if (parsedLocation) {
                result.push({
                    id: 'theone',
                    geometry: parsedLocation,
                });
            }
        }

        if (edges) {
            result = [
                ...result,
                ...(edges
                    .map((edge) => {
                        const edgeData = edge.node;
                        if (!edgeData.frontmatter) {
                            return null;
                        }

                        const parsedLocation = parseLocation(
                            edgeData.frontmatter?.location,
                        );
                        if (!parsedLocation) {
                            return null;
                        }

                        const { title, slug } = edgeData.frontmatter;
                        const path = fillTemplate(BUILDING_DETAIL, { slug });

                        const miniature = extractImageMiniature(edge);

                        return {
                            id: edgeData.id,
                            modules: PLACE_MARK_MODULES,
                            geometry: parseLocation(
                                edgeData.frontmatter.location,
                            ),
                            properties: {
                                balloonContentHeader: title,
                                balloonContentBody: `<a href="${path}" target="_blank"><img src="${miniature}" /></a>`,
                                balloonContentFooter: `<a href="${path}" target="_blank">Посмотреть</a>`,
                                // hintContent: 'The placemark hint',
                            },
                        };
                    })
                    .filter((x) => !!x) as MapItemType[]),
            ];
        }

        return result;
    }, [location, edges]);

    const defaultState = useMemo(() => {
        const state: MapState = { center: KGD_CENTER, zoom: 12 };

        if (locations.length === 1) {
            state.center = locations[0].geometry;
            state.zoom = 17;
        }

        return state;
    }, [locations]);

    return {
        rootProps: {
            ...props, // rest props go to the root node, as before
            height,
            ref, // same for the ref
        },
        mapProps: {
            width: '100%',
            height,
            defaultState,
        },
        zoomControlProps: {
            options: { float: 'right' },
        },
        placeMarks: locations,
        hasPlaceMarks: !!locations.length,
    };
};
