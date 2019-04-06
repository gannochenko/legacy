import React from 'react';
import { createBrowserHistory, createMemoryHistory } from 'history';

export const createHistory = url => {
    return __CLIENT__
        ? createBrowserHistory()
        : createMemoryHistory({
              initialEntries: [url],
          });
};
export const Context = React.createContext();
export const withHistory = Component => {
    return props => (
        <Context.Consumer>
            {value => <Component {...props} history={value} />}
        </Context.Consumer>
    );
};
