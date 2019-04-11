import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import buildQuery from './query-builder';

function* load(params) {
    const { entity, client } = params;
    try {
        const queryName = `${entity.getCamelName()}Get`;
        const result = yield call(() => {
            return client.query({
                query: buildQuery(params),
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

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
}
