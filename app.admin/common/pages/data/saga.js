import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import gql from 'graphql-tag';

const makeQuery = (
    queryName,
    entity,
    page,
    pageSize,
    sortBy,
    filter,
    select,
) => {
    return gql`
        query {
            ${queryName}(
                limit: 10
                offset: 0
                sort: { full_name: ASC }
            ) {
                errors {
                    code
                    message
                }
                data {
                    code
                }
            }
        }
    `;
};

function* load({ entity, client }) {
    try {
        const queryName = `${entity.getCamelName()}Find`;
        const result = yield call(() => {
            return client.query({
                query: makeQuery(queryName, entity),
            });
        });

        const payload = _.get(result, `data.${queryName}`);
        // todo: check for errors
        console.dir(payload);

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
