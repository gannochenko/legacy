import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withClient } from '../../lib/client';
import { withHistory } from '../../lib/history';
import { parseSearch } from '../../lib/util';

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
    history,
}) => {
    const entityName = _.get(route, 'match.params.entity_name');
    const code = _.get(route, 'match.params.code');
    const entity = schema.getEntity(entityName);

    if (!entity || !code) {
        return null;
    }

    // const search = useMemo(() => parseSearch(route.location.search), [
    //     route.location.search,
    // ]);

    useEffect(() => {
        dispatch({
            type: LOAD,
            client,
            entity,
	        code,
        });
    }, [entity.getName(), code]);

    return (
        <Layout title={entity.getDisplayName()}>

        </Layout>
    );
};

export default withHistory(
    withClient(
        connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
    ),
);
