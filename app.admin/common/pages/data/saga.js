import { takeLatest, put, call } from 'redux-saga/effects';
import * as reducer from './reducer';
import gql from 'graphql-tag';

const makeQuery = (entity, page, pageSize, sortBy, filter, select) => {
    return gql`
        query {
            ImportantPersonFind(
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
                    full_name
                    lucky_numbers
                    partner {
                        full_name
                    }
                    pets(sort: { nickname: ASC }) {
                        nickname
                    }
                }
            }
        }
    `;
};

function* load({ client }) {
    try {
        const data = yield call(() => {
            return client.query({
                query: makeQuery(),
            });
        });
        yield put({ type: reducer.LOAD_SUCCESS, payload: { data } });
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
