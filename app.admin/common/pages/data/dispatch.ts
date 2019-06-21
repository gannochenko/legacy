import { push } from 'connected-react-router';
import { LOAD, UNLOAD, DELETE } from './reducer';
import { putSearchParameters } from '../../lib/util';

export default dispatch => ({
    dispatchLoad: (client, entity, pageParams) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                ...pageParams,
            },
        }),
    dispatchUnload: () =>
        dispatch({
            type: UNLOAD,
        }),
    dispatchNavigateToDetail: (entity, itemCode = 'new') =>
        dispatch(
            push(
                `/data/${encodeURIComponent(
                    entity.getName(),
                )}/${encodeURIComponent(itemCode)}/`,
            ),
        ),
    dispatchDelete: (client, entity, itemCode, pageParams) =>
        dispatch({
            type: DELETE,
            payload: {
                entity,
                code: itemCode,
                client,
                ...pageParams,
            },
        }),
    dispatchUpdateSearch: (route, parameters) =>
        dispatch(push(putSearchParameters(route.location.search, parameters))),
});
