import { LOAD, UNLOAD } from './reducer';
import { Dispatch } from '../../store/type';
import { Client } from '../../lib/client';

export default (dispatch: Dispatch) => ({
    dispatch,
    dispatchLoad: (client: Client) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
            },
        }),
    dispatchUnload: () =>
        dispatch({
            type: UNLOAD,
        }),
});
