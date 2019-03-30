import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ApplicationLayout from './components/Application';

const Application = () => (
    <Provider store={store}>
        <ApplicationLayout />
    </Provider>
);

export default Application;
