import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';
import { Entity, ENTITY_ID_FIELD_NAME } from '@project-minimum/core';
import { useErrorNotification, useDispatchUnload } from '../../lib/hooks';
import { withClient } from '../../lib/client';
import { Form, Layout } from '../../components';

import mapDispatchToProps from './dispatch';
import { DataDetailPageProperties } from './type';

const DataPage: FunctionComponent<DataDetailPageProperties> = ({
    client,
    route,
    schema,
    ready = false,
    data = [],
    formData = {},
    notify = () => {},
    error = null,
    saveCounter = 0,
    dispatch = () => {},
    dispatchLoad = () => {},
    dispatchUnload = () => {},
    dispatchSuccess = () => {},
    dispatchDelete = () => {},
    dispatchSave = () => {},
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

    let entity: Nullable<Entity> = null;
    let entityName = '';
    let id = '';

    if (schema) {
        id = _.get(route, `match.params.${ENTITY_ID_FIELD_NAME}`);
        entity = schema.getEntity(_.get(route, 'match.params.entity_name'));

        if (entity) {
            entityName = entity.getName();
        }
    }

    // load data on mount
    useEffect(() => {
        if (!entity || !id) {
            return;
        }

        if (id !== 'new') {
            dispatchLoad(client, { entity, schema, id });
        } else {
            dispatchSuccess();
        }
    }, [entityName, id]);

    if (!entity || !id) {
        return null;
    }

    data = data || {};

    let displayId = '';
    if (ready) {
        displayId = data[ENTITY_ID_FIELD_NAME] || 'new';
    }

    return (
        <Layout title={`${entity.getDisplayName()}: ${displayId}`}>
            {ready && (
                <Form
                    data={data || {}}
                    schema={schema || {}}
                    entity={entity}
                    dispatch={dispatch}
                    formData={formData}
                    onSubmit={(values, formActions) => {
                        dispatchSave(client, {
                            entity,
                            values,
                            formActions,
                            id,
                        });
                    }}
                    onActionClick={action => {
                        if (action === 'delete' && id) {
                            dispatchDelete(client, { entity, id });
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
