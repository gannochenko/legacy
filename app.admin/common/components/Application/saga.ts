import { takeLatest, put, call } from 'redux-saga/effects';
import { Schema } from 'project-minimum-core';
import { LOAD, LOAD_SUCCESS, LOAD_FAILURE } from './reducer';

function* load({ payload: { client } }) {
    try {
        const user = {}; // todo

        const result = yield call(() => client.get(`schema/draft`));
        let schema = null;
        if (!_.iane(result.data.errors)) {
            schema = new Schema(result.data.data);
        } else {
            yield put({
                type: LOAD_FAILURE,
                payload: result.data.errors,
            });
            if (__DEV__) {
                console.error(result.data.errors);
            }
        }

        yield put({ type: LOAD_SUCCESS, payload: { user, schema } });
    } catch (error) {
        yield put({ type: LOAD_FAILURE, payload: [error] });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export default function* watcher() {
    // @ts-ignore
    yield takeLatest(LOAD, load);
}
