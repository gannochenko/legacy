import { LOAD, UNLOAD, DELETE, LOAD_SUCCESS, SAVE } from './reducer';

export default dispatch => ({
    dispatch,
    dispatchLoad: (client, parameters) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
                parameters,
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
    dispatchDelete: (client, parameters) =>
        dispatch({
            type: DELETE,
            payload: {
                client,
                parameters,
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
