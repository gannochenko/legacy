import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Modal, ModalContext, withNotification } from 'ew-internals-ui';
import { ENTITY_ID_FIELD_NAME } from 'project-minimum-core';
import { MainProgressBar } from './style';
import { ApplicationProperties } from './type';
import {
    useNetworkMonitor,
    useErrorNotification,
    useNetworkNotification,
} from '../../lib/hooks';

import { SHOW_OFFLINE, SHOW_ONLINE } from './reducer';
import mapDispatchToProps from './dispatch';
import { GlobalStyle } from '../../style/global';

import HomePage from '../../pages/home';
import DataPage from '../../pages/data';
import DataDetailPage from '../../pages/data-detail';
import SchemaPage from '../../pages/schema';
import NotFoundPage from '../../pages/404';
import ForbiddenPage from '../../pages/403';

const ApplicationComponent: FunctionComponent<ApplicationProperties> = ({
    ready = false,
    client,
    history,
    theme,
    error = null,
    notify = () => {},
    offline = false,
    dispatch = () => {},
    dispatchLoad = () => {},
}) => {
    useEffect(() => {
        dispatchLoad(client);
    }, []);

    const modalRef = useRef();

    useNetworkMonitor(dispatch, SHOW_ONLINE, SHOW_OFFLINE);
    useErrorNotification(error, notify);
    useNetworkNotification(offline, notify);

    return (
        <>
            <GlobalStyle />
            <Modal ref={modalRef} theme={theme.modal} active />
            <MainProgressBar observeGlobalLock />
            <ModalContext.Provider value={modalRef}>
                {ready && (
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={route => <HomePage route={route} />}
                            />
                            <Route
                                path={`/data/:entity_name/:${ENTITY_ID_FIELD_NAME}`}
                                render={route => (
                                    <DataDetailPage route={route} />
                                )}
                            />
                            <Route
                                path="/data/:entity_name"
                                render={route => <DataPage route={route} />}
                            />
                            <Route
                                path="/schema"
                                render={route => <SchemaPage route={route} />}
                            />
                            <Route
                                path="/403"
                                render={() => <ForbiddenPage />}
                            />
                            <Route render={() => <NotFoundPage />} />
                        </Switch>
                    </ConnectedRouter>
                )}
            </ModalContext.Provider>
        </>
    );
};

export const Application = withNotification(
    connect(
        s => s.application,
        mapDispatchToProps,
    )(ApplicationComponent),
);
