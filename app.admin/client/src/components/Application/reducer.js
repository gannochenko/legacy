export const LOAD = 'application.load';
export const LOAD_SUCCESS = 'application.load.success';
export const LOAD_FAILURE = 'application.load.failure';

const initialState = {
    loading: false,
    ready: false,
    error: null,
    user: null,
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
