import React, { useEffect, useMemo } from 'react';
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

export default withSettings(
    connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
);
