import configureStore from 'redux-mock-store';
import { render as renderTest } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

export const render = ({ children, reducer, point, state, router = null }) => {
    const mockStore = configureStore([]);

    if (!_.isFunction(state)) {
        Object.assign(
            {
                [point]: Object.assign({}, reducer.initialState),
            },
            state,
        );
    }
    router = router || { route: '/', location: '/' };

    const store = mockStore(state);
    return {
        ...renderTest(
            <Provider store={store}>
                <MemoryRouter initialEntries={[router.location]}>
                    <Switch>
                        <Route
                            path={router.route}
                            render={route => children({ route })}
                        />
                    </Switch>
                </MemoryRouter>
            </Provider>,
        ),
        store,
    };
};
