import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';
import { useErrorNotification, useDispatchUnload } from '../../lib/hooks';
import { withClient } from '../../lib/client';
import { Form, Layout } from '../../components';

import mapDispatchToProps from './dispatch';

const DataPage = ({
    client,
    route,
    schema,
    ready,
    data,
    formData,
    notify,
    error,
    saveCounter,
    dispatch,
    dispatchLoad,
    dispatchUnload,
    dispatchSuccess,
    dispatchDelete,
    dispatchSave,
}) => {
    useErrorNotification(error, notify);
    useDispatchUnload(dispatchUnload);

    useEffect(() => {
        if (saveCounter) {
            notify({
                text: 'Changes saved',
                type: 'confirm',
                code: 'saved',
                lifeTime: 2000,
            });
        }
    }, [saveCounter]);

    let entity = null;
    let entityName = '';
    let code = '';

    if (schema) {
        code = _.get(route, 'match.params.code');
        entity = schema.getEntity(_.get(route, 'match.params.entity_name'));

        if (entity) {
            entityName = entity.getName();
        }
    }

    // load data on mount
    useEffect(() => {
        if (!entity || !code) {
            return;
        }

        if (code !== 'new') {
            dispatchLoad(client, entity, schema, code);
        } else {
            dispatchSuccess();
        }
    }, [entityName, code]);

    if (!entity || !code) {
        return null;
    }

    data = data || {};

    let displayCode = '';
    if (ready) {
        displayCode = data.code ? data.code : 'new';
    }

    return (
        <Layout title={`${entity.getDisplayName()}: ${displayCode}`}>
            {ready && (
                <Form
                    data={data || {}}
                    schema={schema || {}}
                    entity={entity}
                    dispatch={dispatch}
                    formData={formData}
                    onSubmit={(values, formActions) => {
                        dispatchSave(client, entity, values, formActions, code);
                    }}
                    onActionClick={action => {
                        if (action === 'delete' && data.code) {
                            dispatchDelete(client, entity, data.code);
                        }
                    }}
                />
            )}
        </Layout>
    );
};

export default withNotification(
    withClient(
        connect(
            s => ({ ...s['data-detail'], schema: s.application.schema }),
            mapDispatchToProps,
        )(DataPage),
    ),
);
