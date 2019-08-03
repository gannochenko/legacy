import { LOAD, UNLOAD, DELETE, LOAD_SUCCESS, SAVE } from './reducer';

export default dispatch => ({
    dispatch,
    dispatchLoad: (client, entity, schema, id) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                schema,
                id,
            },
        }),
    dispatchUnload: () =>
        dispatch({
            type: UNLOAD,
        }),
    dispatchSuccess: () =>
        dispatch({
            type: LOAD_SUCCESS,
            payload: {
                data: {},
            },
        }),
    dispatchDelete: (client, entity, id) =>
        dispatch({
            type: DELETE,
            payload: {
                entity,
                id,
                client,
            },
        }),
    dispatchSave: (client, entity, data, formActions, id) =>
        dispatch({
            type: SAVE,
            payload: {
                data,
                entity,
                client,
                formActions,
                id,
            },
        }),
});
