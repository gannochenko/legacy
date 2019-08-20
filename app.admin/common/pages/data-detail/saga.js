import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import { push } from 'connected-react-router';
import {
    buildQueryLoad,
    buildQuerySearch,
    buildMutationPut,
    buildMutationDelete,
} from './query-builder';

function* load(client, parameters) {
    try {
        const [queryName, query] = buildQueryLoad(parameters);
        const apolloResult = yield call(() => {
            return client.query({
                query,
            });
        });

        const result = _.get(apolloResult, `data.${queryName}`);
        if (_.isArrayNotEmpty(result.errors)) {
            yield put({
                type: reducer.LOAD_FAILURE,
                payload: result.errors,
            });
        } else {
            yield put({
                type: reducer.LOAD_SUCCESS,
                payload: { data: result.data },
            });
        }
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: [error] });
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }
}

function* itemSearch(params) {
    const { payload } = params;
    const { client, field, text } = payload || {};

    if (!_.isStringNotEmpty(text)) {
        yield put({
            type: reducer.ITEM_SEARCH_SUCCESS,
            payload: { field: field.getName(), data: [] },
        });
        return;
    }

    try {
        const [queryName, query] = buildQuerySearch(payload);
        const apolloResult = yield call(() => {
            return client.query({
                query,
            });
        });

        const result = _.get(apolloResult, `data.${queryName}`);
        if (_.isArrayNotEmpty(result.errors)) {
            yield put({
                type: reducer.ITEM_SEARCH_FAILURE,
                payload: result.errors,
            });
        } else {
            yield put({
                type: reducer.ITEM_SEARCH_SUCCESS,
                payload: { field: field.getName(), data: result.data },
            });
        }
    } catch (error) {
        yield put({ type: reducer.ITEM_SEARCH_FAILURE, payload: [error] });
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }
}

function* save(params) {
    const { payload } = params || {};
    let { client, formActions, id, entity } = payload || {};
    formActions = formActions || {};

    try {
        const [mutationName, mutation] = buildMutationPut(payload);

        const apolloResult = yield call(() => {
            return client.mutate({
                mutation,
            });
        });

        if (_.isFunction(formActions.setSubmitting)) {
            formActions.setSubmitting(false);
        }

        const result = _.get(apolloResult, `data.${mutationName}`);
        if (_.isArrayNotEmpty(result.errors)) {
            yield put({
                type: reducer.SAVE_FAILURE,
                payload: result.errors,
            });
        } else {
            const newId = _.get(result, 'data.id');

            yield put({
                type: reducer.SAVE_SUCCESS,
            });
            if (id !== newId) {
                yield put(
                    push(
                        `/data/${encodeURIComponent(
                            entity.getName(),
                        )}/${encodeURIComponent(newId)}/`,
                    ),
                );
            }
        }
    } catch (error) {
        yield put({ type: reducer.SAVE_FAILURE, payload: [error] });
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }
}

function* remove(params) {
    const { payload } = params || {};
    const { client, entity } = payload || {};

    try {
        const [mutationName, mutation] = buildMutationDelete(payload);
        const apolloResult = yield call(() => {
            return client.mutate({
                mutation,
            });
        });

        const result = _.get(apolloResult, `data.${mutationName}`);
        if (_.isArrayNotEmpty(result.errors)) {
            yield put({
                type: reducer.DELETE_FAILURE,
                payload: result.errors,
            });
        } else {
            yield put(push(`/data/${encodeURIComponent(entity.getName())}/`));
        }
    } catch (error) {
        yield put({ type: reducer.DELETE_FAILURE, payload: error });
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
    yield takeLatest(reducer.ITEM_SEARCH, itemSearch);
    yield takeLatest(reducer.SAVE, save);
    yield takeLatest(reducer.DELETE, remove);
}
