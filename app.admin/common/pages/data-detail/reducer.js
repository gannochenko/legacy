export const LOAD = 'data-detail.load';
export const LOAD_SUCCESS = 'data-detail.load.success';
export const LOAD_FAILURE = 'data-detail.load.failure';
export const UNLOAD = 'data-detail.unload';
export const ITEM_SEARCH = 'data-detail.item-search';
export const ITEM_SEARCH_SUCCESS = 'data-detail.item-search.success';
export const ITEM_SEARCH_FAILURE = 'data-detail.item-search.failure';
export const ITEM_SEARCH_CLEANUP = 'data-detail.item-search.cleanup';
export const SAVE = 'data-detail.save';
export const SAVE_SUCCESS = 'data-detail.save.success';
export const SAVE_FAILURE = 'data-detail.save.failure';

const initialState = {
    loading: false,
    ready: false,
    data: null,
    error: null,
    formData: {},
    // itemSearchResult: {},
    // itemSearchError: {},
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
        case ITEM_SEARCH_SUCCESS:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.field]: {
                        result: action.payload.data,
                        error: [],
                    },
                },
                // itemSearchResult: {
                //     ...state.itemSearchResult,
                //     [action.payload.field]: action.payload.data,
                // },
                // itemSearchError: {
                //     ...state.itemSearchError,
                //     [action.payload.field]: [],
                // },
            };
        case ITEM_SEARCH_FAILURE:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.field]: {
                        result: {},
                        error: action.payload.error,
                    },
                },
                // itemSearchResult: {
                //     ...state.itemSearchResult,
                //     [action.payload.field]: {},
                // },
                // itemSearchError: {
                //     ...state.itemSearchError,
                //     [action.payload.field]: action.payload.error,
                // },
            };
        case ITEM_SEARCH_CLEANUP:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.field]: {
                        result: {},
                        error: [],
                    },
                },
                // itemSearchResult: {
                //     ...state.itemSearchResult,
                //     [action.payload.field]: [],
                // },
                // itemSearchError: {
                //     ...state.itemSearchError,
                //     [action.payload.field]: [],
                // },
            };
        default:
            return state;
    }
};

export default reducer;
