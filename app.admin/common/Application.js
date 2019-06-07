import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { Notification, NotificationContext } from 'ew-internals-ui';

import { ThemeContext } from './style/global';
import { Context as SettingsContext, createSettings } from './lib/settings';
import { createHistory } from './lib/history';
import { Context as ClientContext, createClient } from './lib/client';
import ApplicationUI from './components/Application';
import { createStore } from './store';
import { dismissOnReady } from './splash/client';

import theme from './style/theme';

const history = createHistory();
const { store, saga, unsubscribe } = createStore({
    history,
    onChange: dismissOnReady,
});
const settings = createSettings();
const client = createClient(settings);

const Application = () => {
    const notificationRef = useRef();

    return (
        <ThemeContext.Provider value={theme}>
            <SettingsContext.Provider value={settings}>
                <ClientContext.Provider value={client}>
                    <Provider store={store}>
                        <Notification
                            ref={notificationRef}
                            theme={theme.notifications}
                        />
                        <NotificationContext.Provider value={notificationRef}>
                            <ApplicationUI
                                history={history}
                                theme={theme}
                                client={client}
                            />
                        </NotificationContext.Provider>
                    </Provider>
                </ClientContext.Provider>
            </SettingsContext.Provider>
        </ThemeContext.Provider>
    );
};

export default Application;
