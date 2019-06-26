import { takeLatest, put } from 'redux-saga/effects';
import { LOAD_SUCCESS, LOAD_FAILURE, LOAD } from './reducer';

function* load() {
    try {
        const data = {};
        yield put({ type: LOAD_SUCCESS, payload: { data } });
    } catch (error) {
        yield put({ type: LOAD_FAILURE, payload: [error] });
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(LOAD, load);
}
