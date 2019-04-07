import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';

import Schema from '../../../shared/schema';

function* load({ client }) {
    try {
        const user = {}; // todo

        const result = yield call(() => client.get(`schema/draft`));
        let schema = null;
        if (result.data.structure && !_.iane(result.data.errors)) {
            schema = new Schema(result.data.structure);
        } else {
            // todo: handle errors
        }

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
