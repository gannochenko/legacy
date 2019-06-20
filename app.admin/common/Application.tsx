import React, { FunctionComponent, useRef } from 'react';
import { Provider } from 'react-redux';
import { Notification, NotificationContext } from 'ew-internals-ui';

import { ThemeContext } from './style/global';
import { createHistory } from './lib/history';
import { Context as SettingsContext, createSettings } from './lib/settings';
import { Context as ClientContext, createClient } from './lib/client';
import ApplicationUI from './components/Application';
import { createStore } from './store';
import { dismissOnReady } from './splash/client';

import theme from './style/theme';

const history = createHistory();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { store, saga, unsubscribe } = createStore({
    history,
    onChange: dismissOnReady,
});
const settings = createSettings();
const client = createClient(settings);

const Application: FunctionComponent<{}> = () => {
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
