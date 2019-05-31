import { applyMiddleware, compose, createStore as createRawStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import logger from 'redux-logger';

import reducers from './reducers';
import sagas from './sagas';

export const createStore = ({ history, onChange }) => {
    const saga = createSagaMiddleware();
    const store = createRawStore(
        combineReducers(
            Object.assign(
                {
                    router: connectRouter(history),
                },
                reducers,
            ),
        ),
        {},
        compose(applyMiddleware(routerMiddleware(history), saga, logger)),
    );
    saga.run(function*() {
        yield all(sagas.map(saga => fork(saga)));
    });

    let unsubscribe = null;
    if (_.isFunction(onChange)) {
        unsubscribe = store.subscribe(() => {
            onChange({ store, unsubscribe });
        });
    }

    return { store, saga, unsubscribe };
};
