import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { LOAD, UNLOAD, SAVE } from './reducer';
import { withClient } from '../../lib/client';
import Form from '../../components/Form';

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
    const code = _.get(route, 'match.params.code');
    const entity = schema.getEntity(entityName);

    if (!entity || !code) {
        return null;
    }

    // const search = useMemo(() => parseSearch(route.location.search), [
    //     route.location.search,
    // ]);

    // load data on mount
    useEffect(() => {
        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                schema,
                code,
            },
        });
    }, [entity.getName(), code]);

    // cleanup data on unmount
    useEffect(
        () => () => {
            dispatch({
                type: UNLOAD,
            });
        },
        [],
    );

    data = data || {};

    return (
        <Layout
            title={`${entity.getDisplayName()}${
                data.code ? `: ${data.code}` : ''
            }`}
        >
            {ready && (
                <Form
                    data={data || {}}
                    schema={schema || {}}
                    entity={entity}
                    onSubmit={(values, formActions) => {
                        dispatch({
                            type: SAVE,
                            payload: {
                                data: values,
                                entity,
                                client,
                                formActions,
                            },
                        });
                    }}
                />
            )}
        </Layout>
    );
};

export default withClient(
    connect(s => ({ ...s['data-detail'], schema: s.application.schema }))(
        DataPage,
    ),
);
