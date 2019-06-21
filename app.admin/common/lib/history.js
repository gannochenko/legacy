import React from 'react';
import { createBrowserHistory, createMemoryHistory } from 'history';

export const createHistory = url => {
    return __CLIENT__
        ? createBrowserHistory()
        : createMemoryHistory({
              initialEntries: [url],
          });
};
