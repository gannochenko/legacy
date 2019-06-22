import { push } from 'connected-react-router';
import { LOAD, UNLOAD, DELETE, LOAD_SUCCESS, SAVE } from './reducer';

export default dispatch => ({
    dispatch,
    dispatchLoad: (client, entity, schema, code) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                schema,
                code,
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
    dispatchDelete: (client, entity, code) =>
        dispatch({
            type: DELETE,
            payload: {
                entity,
                code,
                client,
            },
        }),
    dispatchSave: (client, entity, data, formActions, code) =>
        dispatch({
            type: SAVE,
            payload: {
                data,
                entity,
                client,
                formActions,
                code,
            },
        }),
});
