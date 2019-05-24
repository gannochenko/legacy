import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withSettings } from '../../lib/settings';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';
import { withNotification } from 'ew-internals-ui';

const SchemaPage = ({ dispatch, settings, error, notify }) => {
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
            <h1>Structure here</h1>
        </Layout>
    );
};

export default withNotification(
    withSettings(connect(x => x.schema)(SchemaPage)),
);
