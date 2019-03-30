import { createBrowserHistory, createMemoryHistory } from 'history';

const history = __CLIENT__
    ? createBrowserHistory()
    : createMemoryHistory({
          // initialEntries: [this.getCurrentURL()],
      });

export default history;
