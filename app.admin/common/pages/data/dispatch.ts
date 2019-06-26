import { push } from 'connected-react-router';
import { LOAD, UNLOAD, DELETE } from './reducer';
import { putSearchParameters } from '../../lib/util';

import { Client } from '../../lib/client';
import { Entity } from '../../lib/project-minimum-core';
import { DispatchLoadProperties } from './type';
import { Route } from '../../lib/type';

export default dispatch => ({
    dispatchLoad: (client: Client, parameters: DispatchLoadProperties) => {
        const { entity, pageParams } = parameters;

        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                ...pageParams,
            },
        });
    },
    dispatchUnload: () =>
        dispatch({
            type: UNLOAD,
        }),
    dispatchNavigateToDetail: (entity: Entity, itemCode?: string) =>
        dispatch(
            push(
                `/data/${encodeURIComponent(
                    entity.getName(),
                )}/${encodeURIComponent(itemCode || 'new')}/`,
            ),
        ),
    dispatchDelete: (
        client: Client,
        entity: Entity,
        itemCode: string,
        pageParams: object,
    ) =>
        dispatch({
            type: DELETE,
            payload: {
                entity,
                code: itemCode,
                client,
                ...pageParams,
            },
        }),
    dispatchUpdateSearch: (route: Route, parameters: object) =>
        dispatch(push(putSearchParameters(route.location.search, parameters))),
});
