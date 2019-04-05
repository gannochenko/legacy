import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withSettings } from '../../lib/settings';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';

const SchemaPage = ({ dispatch, settings }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
            settings,
        });
    }, []);

    return (
        <Layout>
            <h1>Structure here</h1>
        </Layout>
    );
};

export default withSettings(connect(x => x.schema)(SchemaPage));
