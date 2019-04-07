import React from 'react';
import { Provider } from 'react-redux';

import { ThemeContext } from './style/global';
import { Context as SettingsContext, createSettings } from './lib/settings';
import { Context as HistoryContext, createHistory } from './lib/history';
import { Context as ClientContext, createClient } from './lib/client';
import ApplicationUI from './components/Application';
import { createStore } from './store';

import theme from './style/theme';

const history = createHistory();
const { store, saga } = createStore({ history });
const settings = createSettings();
const client = createClient(settings);

const Application = () => (
    <ThemeContext.Provider value={theme}>
        <SettingsContext.Provider value={settings}>
            <HistoryContext.Provider value={history}>
                <ClientContext.Provider value={client}>
                    <Provider store={store}>
                        <ApplicationUI history={history} client={client} />
                    </Provider>
                </ClientContext.Provider>
            </HistoryContext.Provider>
        </SettingsContext.Provider>
    </ThemeContext.Provider>
);

export default Application;
