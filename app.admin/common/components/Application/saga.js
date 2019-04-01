import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';

import Structure from '../../lib/structure';

function* load({ settings }) {
    try {
        const user = {}; // todo
        const structure = yield call(() => Structure.load(settings));
        yield put({ type: reducer.LOAD_SUCCESS, payload: { user, structure } });
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
