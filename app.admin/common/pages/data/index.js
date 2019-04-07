import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withClient } from '../../lib/client';
import List from '../../components/List';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';

const DataPage = ({ dispatch, client, route, schema }) => {
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

    const columns = useMemo(() => {
        return entity.getFields().map(field => ({
            name: field.getName(),
            display: field.getDisplayName(),
            sortable: field.isSortable(),
        }));
    }, [entity]);

    return (
        <Layout title={entity.getDisplayName()}>
            <List columns={columns} />
        </Layout>
    );
};

export default withClient(
    connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
);
