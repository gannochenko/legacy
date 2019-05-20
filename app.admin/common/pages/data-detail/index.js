import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { LOAD, UNLOAD, SAVE, LOAD_SUCCESS, DELETE } from './reducer';
import { withClient } from '../../lib/client';
import { withNotification } from 'ew-internals-ui';
import Form from '../../components/Form';
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
    formData,
    notify,
    error,
    saveCounter,
}) => {
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

    // cleanup data on unmount
    useEffect(
        () => () => {
            dispatch({
                type: UNLOAD,
            });
        },
        [],
    );

    useEffect(() => {
        if (_.iane(error)) {
            notify({
                text: error[0].message,
                type: 'error',
                code: 'error',
            });
        }
    }, [error]);

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

    return (
        <Layout
            title={
                ready
                    ? `${entity.getDisplayName()}${
                          data.code ? `: ${data.code}` : ': new'
                      }`
                    : ''
            }
            // actions={
            //     <>
            //        <Button
            //            type="button"
            //            onClick={() => dispatch(push(`/data/${entity.getName()}/new/`))}
            //        >
            //            Add
            //        </Button>
            //     </>
            // }
        >
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
