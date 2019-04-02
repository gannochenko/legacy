export const LOAD = 'data.load';
export const LOAD_SUCCESS = 'data.load.success';
export const LOAD_FAILURE = 'data.load.failure';

const initialState = {
    loading: false,
    ready: false,
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
        default:
            return state;
    }
};

export default reducer;
