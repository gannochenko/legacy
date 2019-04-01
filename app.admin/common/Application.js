import React from 'react';
import { Provider } from 'react-redux';
import { Settings } from 'ew-internals';

import { ThemeContext } from './style/global';
import { SettingsContext } from './lib/settings';
import ApplicationUI from './components/Application';

import store from './store';
import theme from './style/theme';
const settings = new Settings();

const Application = () => (
    <ThemeContext.Provider value={theme}>
        <SettingsContext.Provider value={settings}>
            <Provider store={store}>
                <ApplicationUI />
            </Provider>
        </SettingsContext.Provider>
    </ThemeContext.Provider>
);

export default Application;
