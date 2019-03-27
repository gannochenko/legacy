import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import logger from 'redux-logger';

import history from '../lib/history';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers(
        Object.assign(
            {
                router: connectRouter(history),
            },
            reducers,
        ),
    ),
    {},
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)),
);
sagaMiddleware.run(function*() {
    yield all(sagas.map(saga => fork(saga)));
});

export default store;
