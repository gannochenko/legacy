import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';
import { LOAD, UNLOAD, SAVE, LOAD_SUCCESS, DELETE } from './reducer';
import { useErrorNotification, useUnload } from '../../lib/hooks';
import { withClient } from '../../lib/client';
import Form from '../../components/Form';
// import Button from '../../material-kit/CustomButtons';

import Layout from '../../components/Layout';

const DataPage = ({
    dispatch,
    client,
    route,
    schema,
    ready,
    data,
    formData,
    notify,
    error,
    saveCounter,
}) => {
    if (!schema) {
        return null;
    }

    const entityName = _.get(route, 'match.params.entity_name');
    const code = _.get(route, 'match.params.code');
    const entity = schema.getEntity(entityName);

    if (!entity || !code) {
        return null;
    }

    // load data on mount
    useEffect(() => {
        if (code !== 'new') {
            dispatch({
                type: LOAD,
                payload: {
                    client,
                    entity,
                    schema,
                    code,
                },
            });
        } else {
            dispatch({
                type: LOAD_SUCCESS,
                payload: {
                    data: {},
                },
            });
        }
    }, [entity.getName(), code]);
    useErrorNotification(error, notify);
    useUnload(dispatch, UNLOAD);
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
                        dispatch({
                            type: SAVE,
                            payload: {
                                data: values,
                                entity,
                                client,
                                formActions,
                                code,
                            },
                        });
                    }}
                    onActionClick={action => {
                        if (action === 'delete') {
                            if (data.code) {
                                dispatch({
                                    type: DELETE,
                                    payload: {
                                        entity,
                                        code: data.code,
                                        client,
                                    },
                                });
                            }
                        }
                    }}
                />
            )}
        </Layout>
    );
};

export default withNotification(
    withClient(
        connect(s => ({ ...s['data-detail'], schema: s.application.schema }))(
            DataPage,
        ),
    ),
);
