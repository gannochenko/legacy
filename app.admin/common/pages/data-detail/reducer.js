export const LOAD = 'data-detail.load';
export const LOAD_SUCCESS = 'data-detail.load.success';
export const LOAD_FAILURE = 'data-detail.load.failure';
export const UNLOAD = 'data-detail.unload';

const initialState = {
    loading: false,
    ready: false,
    data: null,
    error: null,
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
