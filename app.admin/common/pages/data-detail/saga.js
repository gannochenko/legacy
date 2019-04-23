import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import { buildQueryLoad, buildQuerySearch } from './query-builder';

function* load(params) {
    const { payload } = params;
    const { entity, client } = payload || {};
    try {
        const queryName = `${entity.getCamelName()}Get`;
        const result = yield call(() => {
            return client.query({
                query: buildQueryLoad(payload),
            });
        });

        const queryResult = _.get(result, `data.${queryName}`);
        // todo: check for errors
        // console.dir(payload);

        yield put({
            type: reducer.LOAD_SUCCESS,
            payload: { data: queryResult.data },
        });
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

function* itemSearch(params) {
    const { payload } = params;
    const { entity, client, field } = payload || {};
    try {
        const queryName = `${entity.getCamelName()}Find`;
        const result = yield call(() => {
            return client.query({
                query: buildQuerySearch(payload),
            });
        });

        const queryResult = _.get(result, `data.${queryName}`);
        // todo: check for errors

        yield put({
            type: reducer.ITEM_SEARCH_SUCCESS,
            payload: { field: field.getName(), data: queryResult.data },
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
