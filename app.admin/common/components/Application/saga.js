import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';

import loadSchema from '../../../shared/schema/loader/client.js';

function* load({ settings }) {
    try {
        const user = {}; // todo
        const schema = yield call(() => loadSchema(settings));
        yield put({ type: reducer.LOAD_SUCCESS, payload: { user, schema } });
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
