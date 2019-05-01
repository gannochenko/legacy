export const LOAD = 'data.load';
export const LOAD_SUCCESS = 'data.load.success';
export const LOAD_FAILURE = 'data.load.failure';
export const UNLOAD = 'data.unload';

const initialState = {
    loading: false,
    ready: false,
    error: null,
    data: [],
    count: 0,
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
        default:
            return state;
    }
};

export default reducer;
