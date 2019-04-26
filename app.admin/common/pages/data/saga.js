import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import buildQuery from './query-builder';

function* load(params) {
    const { payload } = params || {};
    const { client } = payload || {};
    try {
        const [queryName, query] = buildQuery(payload);
        const result = yield call(() => {
            return client.query({
                query,
            });
        });

        const queryResult = _.get(result, `data.${queryName}`);
        // todo: check for errors
        // console.dir(payload);

        yield put({
            type: reducer.LOAD_SUCCESS,
            payload: { data: queryResult.data, count: queryResult.count },
        });
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
}
