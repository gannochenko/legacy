import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';

import { LOAD } from './reducer';
import Layout from '../../components/Layout';
import { withClient } from '../../lib/client';

const HomePage = ({ dispatch, settings, error, notify }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
            settings,
        });
    }, []);

    // show error
    useEffect(() => {
        if (_.iane(error)) {
            notify({
                text: error[0].message,
                type: 'error',
                code: 'error',
            });
        }
    }, [error]);

    return (
        <Layout>
            <h1>Hello from Admin</h1>
        </Layout>
    );
};

export default withNotification(withClient(connect(x => x.home)(HomePage)));
