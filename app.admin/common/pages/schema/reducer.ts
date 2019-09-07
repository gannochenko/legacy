import { State } from './type';
import { Action } from '../../store/type';

export const LOAD = 'schema.ts.js.load';
export const LOAD_SUCCESS = 'schema.ts.js.load.success';
export const LOAD_FAILURE = 'schema.ts.js.load.failure';
export const UNLOAD = 'schema.ts.js.unload';

const initialState: State = {
    loading: false,
    ready: false,
    error: null,
};

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case LOAD:
            return { ...state, loading: true };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                ready: true,
                error: null,
                ...action.payload,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                ready: true,
                error: action.payload,
            };
        case UNLOAD:
            return { ...initialState };
        default:
            return state;
    }
};

export default reducer;
