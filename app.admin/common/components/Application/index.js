import React, { useEffect, useRef } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
    Notification,
    NotificationContext,
    Modal,
    ModalContext,
} from 'ew-internals-ui';
import { MainProgressBar } from './style';

import { LOAD } from './reducer';
import { GlobalStyle } from '../../style/global';

import HomePage from '../../pages/home';
import DataPage from '../../pages/data';
import DataDetailPage from '../../pages/data-detail';
import SchemaPage from '../../pages/schema';
import NotFoundPage from '../../pages/404';
import ForbiddenPage from '../../pages/403';

const Application = ({ dispatch, ready, client, history, theme }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
            client,
        });
    }, []);

    const notificationRef = useRef();
    const modalRef = useRef();

    return (
        <>
            <GlobalStyle />
            <Notification ref={notificationRef} theme={theme.notifications} />
            <Modal ref={modalRef} theme={theme.modal} active />
            <MainProgressBar observeGlobalLock />
            <NotificationContext.Provider value={notificationRef}>
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
                                    path="/data/:entity_name/:code"
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
                                    render={route => (
                                        <SchemaPage route={route} />
                                    )}
                                />
                                <Route
                                    path="/403"
                                    render={route => (
                                        <ForbiddenPage route={route} />
                                    )}
                                />
                                <Route
                                    render={route => (
                                        <NotFoundPage route={route} />
                                    )}
                                />
                            </Switch>
                        </ConnectedRouter>
                    )}
                </ModalContext.Provider>
            </NotificationContext.Provider>
        </>
    );
};

export default connect(s => s.application)(Application);
