import { takeLatest, put, call } from 'redux-saga/effects';
import { Schema } from 'project-minimum-core';
import * as reducer from './reducer';

function* load({ client }) {
    try {
        const user = {}; // todo

        const result = yield call(() => client.get(`schema/draft`));
        let schema = null;
        if (result.data.structure && !_.iane(result.data.errors)) {
            schema = new Schema(result.data.structure);
        } else {
            yield put({
                type: reducer.LOAD_FAILURE,
                payload: result.data.errors,
            });
            if (__DEV__) {
                console.error(result.data.errors);
            }
        }

        yield put({ type: reducer.LOAD_SUCCESS, payload: { user, schema } });
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: [error] });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
}
