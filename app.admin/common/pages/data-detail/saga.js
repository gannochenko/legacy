import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import { buildQueryLoad, buildQuerySearch } from './query-builder';

function* load(params) {
    const { entity, client } = params;
    try {
        const queryName = `${entity.getCamelName()}Get`;
        const result = yield call(() => {
            return client.query({
                query: buildQueryLoad(params),
            });
        });

        const payload = _.get(result, `data.${queryName}`);
        // todo: check for errors
        // console.dir(payload);

        yield put({
            type: reducer.LOAD_SUCCESS,
            payload: { data: payload.data },
        });
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

function* itemSearch(params) {
    const { entity, client, field } = params;
    try {
        const queryName = `${entity.getCamelName()}Find`;
        const result = yield call(() => {
            return client.query({
                query: buildQuerySearch(params),
            });
        });

        const payload = _.get(result, `data.${queryName}`);
        // todo: check for errors

        yield put({
            type: reducer.ITEM_SEARCH_SUCCESS,
            payload: { field: field.getName(), data: payload.data },
        });
    } catch (error) {
        // yield put({ type: reducer.LOAD_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
    yield takeLatest(reducer.ITEM_SEARCH, itemSearch);
}
