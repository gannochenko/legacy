export const LOAD = 'data.load';
export const LOAD_SUCCESS = 'data.load.success';
export const LOAD_FAILURE = 'data.load.failure';
export const UNLOAD = 'delete.unload';
export const DELETE = 'delete';
export const DELETE_SUCCESS = 'delete.success';
export const DELETE_FAILURE = 'delete.failure';

const initialState = {
    loading: false,
    ready: false,
    error: null,
    data: [],
    count: 0,
    errorDelete: null,
};

const reducer = (state = initialState, action) => {
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
                errorDelete: null,
            };
        case DELETE_FAILURE:
            return {
                errorDelete: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
