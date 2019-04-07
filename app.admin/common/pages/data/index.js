import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withClient } from '../../lib/client';
import List from '../../components/List';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';

const DataPage = ({
    dispatch,
    client,
    route,
    schema,
    ready,
    loading,
    data,
}) => {
    const entityName = _.get(route, 'match.params.entity_name');
    const entity = schema.getEntity(entityName);

    if (!entity) {
        return null;
    }

    useEffect(() => {
        dispatch({
            type: LOAD,
            client,
            entity,
        });
    }, [entity.getName()]);

    if (!ready || loading) {
        return null;
    }

    return (
        <Layout title={entity.getDisplayName()}>
            <List entity={entity} data={data} />
        </Layout>
    );
};

export default withClient(
    connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
);
