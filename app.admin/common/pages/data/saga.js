import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import { buildQueryFind, buildMutationDelete } from './query-builder';

function* load(params) {
    const { payload } = params || {};
    const { client } = payload || {};
    try {
        const [queryName, query] = buildQueryFind(payload);
        const apolloResult = yield call(() => {
            return client.query({
                query,
            });
        });

        const result = _.get(apolloResult, `data.${queryName}`);
        if (_.iane(result.errors)) {
            yield put({
                type: reducer.LOAD_FAILURE,
                payload: result.errors,
            });
        } else {
            yield put({
                type: reducer.LOAD_SUCCESS,
                payload: { data: result.data, count: result.count },
            });
        }
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: [error] });
        if (__DEV__) {
            console.error(error);
        }
    }
}

function* remove(params) {
    const { payload } = params || {};
    const { client } = payload || {};

    try {
        const [mutationName, mutation] = buildMutationDelete(payload);
        const apolloResult = yield call(() => {
            return client.mutate({
                mutation,
            });
        });

        const result = _.get(apolloResult, `data.${mutationName}`);
        if (_.iane(result.errors)) {
            yield put({
                type: reducer.DELETE_FAILURE,
                payload: result.errors,
            });
        } else {
            yield put({
                type: reducer.LOAD,
                payload: params.payload,
            });
        }
    } catch (error) {
        yield put({ type: reducer.DELETE_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
    yield takeLatest(reducer.DELETE, remove);
}
