import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withSettings } from '../../lib/settings';
import List from '../../components/List';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';

const DataPage = ({ dispatch, settings, route, schema }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
            settings,
        });
    }, []);

    const entityName = _.get(route, 'match.params.entity_name');
    const entity = schema.getEntity(entityName);

    if (!entity) {
        return null;
    }

    return (
        <Layout title={entity.getDisplayName()}>
            <List />
        </Layout>
    );
};

export default withSettings(
    connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
);
