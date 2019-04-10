import React, { useEffect, useMemo } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { LOAD } from './reducer';
import { GlobalStyle } from '../../style/global';

import HomePage from '../../pages/home';
import DataPage from '../../pages/data';
import DataDetailPage from '../../pages/data-detail';
import SchemaPage from '../../pages/schema';

const Application = ({ dispatch, ready, client, history }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
            client,
        });
    }, []);

    return (
        <>
            <GlobalStyle />
            {ready && (
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={route => <HomePage route={route} />}
                        />
	                    <Route
		                    exact
		                    path="/data/:entity_name/:code"
		                    render={route => <DataDetailPage route={route} />}
	                    />
                        <Route
                            exact
                            path="/data/:entity_name"
                            render={route => <DataPage route={route} />}
                        />
                        <Route
                            exact
                            path="/schema"
                            render={route => <SchemaPage route={route} />}
                        />
                    </Switch>
                </ConnectedRouter>
            )}
        </>
    );
};

export default connect(s => s.application)(Application);
