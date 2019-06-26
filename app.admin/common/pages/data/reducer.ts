import { State } from './type';
import { Action } from '../../store/type';

export const LOAD = 'data.load';
export const LOAD_SUCCESS = 'data.load.success';
export const LOAD_FAILURE = 'data.load.failure';
export const UNLOAD = 'data.unload';
export const DELETE = 'data.delete';
export const DELETE_SUCCESS = 'data.delete.success';
export const DELETE_FAILURE = 'data.delete.failure';

export const initialState: State = {
    loading: false,
    ready: false,
    error: null,
    data: [],
    count: 0,
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
        case DELETE_SUCCESS:
            return {
                ...state,
                error: null,
            };
        case DELETE_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
