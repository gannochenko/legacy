import React, { useEffect } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { LOAD } from './reducer';
import history from '../../lib/history';
import { GlobalStyle, ThemeContext, theme } from '../../style/global';

import HomePage from '../../pages/home';

const Application = ({ dispatch, ready }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
        });
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            <GlobalStyle />
            {ready && (
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={route => <HomePage route={route} />}
                        />
                    </Switch>
                </ConnectedRouter>
            )}
        </ThemeContext.Provider>
    );
};

export default connect(x => x.application)(Application);
