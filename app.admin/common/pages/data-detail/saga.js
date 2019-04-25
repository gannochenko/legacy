import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import {
    buildQueryLoad,
    buildQuerySearch,
    buildMutationPut,
} from './query-builder';

function* load(params) {
    const { payload } = params || {};
    const { entity, client } = payload || {};
    try {
        const queryName = `${entity.getCamelName()}Get`;
        const result = yield call(() => {
            return client.query({
                query: buildQueryLoad(payload),
            });
        });

        const queryResult = _.get(result, `data.${queryName}`);
        // todo: check for errors
        // console.dir(payload);

        yield put({
            type: reducer.LOAD_SUCCESS,
            payload: { data: queryResult.data },
        });
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

function* itemSearch(params) {
    const { payload } = params;
    const { entity, client, field, text } = payload || {};

    if (!_.isne(text)) {
        yield put({
            type: reducer.ITEM_SEARCH_SUCCESS,
            payload: { field: field.getName(), data: [] },
        });
        return;
    }

    try {
        const queryName = `${entity.getCamelName()}Find`;
        const result = yield call(() => {
            return client.query({
                query: buildQuerySearch(payload),
            });
        });

        const queryResult = _.get(result, `data.${queryName}`);
        // todo: check for errors

        yield put({
            type: reducer.ITEM_SEARCH_SUCCESS,
            payload: { field: field.getName(), data: queryResult.data },
        });
    } catch (error) {
        yield put({ type: reducer.ITEM_SEARCH_FAILURE, payload: [error] });
        if (__DEV__) {
            console.error(error);
        }
    }
}

function* save(params) {
    const { payload } = params || {};
    const { client, formActions } = payload || {};

    try {
        const [mutationName, mutation] = buildMutationPut(payload);

        // const result = yield call(() => {
        // 	return client.mutation({
        // 		mutation,
        // 	});
        // });
        //
        // console.dir(result);
        //
        // const mutationResult = _.get(result, `data.${mutationName}`);
        // console.dir(mutationResult);

        // // todo: check for errors
        //
        // yield put({
        // 	type: reducer.ITEM_SEARCH_SUCCESS,
        // 	payload: { field: field.getName(), data: queryResult.data },
        // });
    } catch (error) {
        yield put({ type: reducer.SAVE_FAILURE, payload: [error] });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export default function* watcher() {
    yield takeLatest(reducer.LOAD, load);
    yield takeLatest(reducer.ITEM_SEARCH, itemSearch);
    yield takeLatest(reducer.SAVE, save);
}
