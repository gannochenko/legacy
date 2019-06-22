import { LOAD, UNLOAD } from './reducer';

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
});
