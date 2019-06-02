import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';
// import { stringify, parse } from '@m59/qs';
import { LOAD, UNLOAD, DELETE } from './reducer';
import { withClient } from '../../lib/client';
import List from '../../components/List';
import { putSearchParameters, parseSearch } from '../../lib/util';
import { push } from 'connected-react-router';
import Button from '../../material-kit/CustomButtons';

import Layout from '../../components/Layout';

const extractPageParameters = search => {
    let page = parseInt(search.page, 10);
    if (Number.isNaN(page) || page < 1) {
        page = 1;
    }
    let sort = search.sort;
    if (_.isne(sort)) {
        sort = sort.split(':');
    } else {
        sort = [];
    }

    return {
        page,
        sort,
        pageSize: 10,
    };
};

const DataPage = ({
    dispatch,
    client,
    route,
    schema,
    ready,
    loading,
    data,
    count,
    error,
    notify,
}) => {
    const entity = schema.getEntity(_.get(route, 'match.params.entity_name'));
    if (!entity) {
        return null;
    }

    const search = useMemo(() => parseSearch(route.location.search), [
        route.location.search,
    ]);

    const pageParams = extractPageParameters(search);

    // load data on component mount
    useEffect(() => {
        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                ...pageParams,
            },
        });
    }, [entity.getName(), search]);

    // show error
    useEffect(() => {
        if (_.iane(error)) {
            notify({
                text: error[0].message,
                type: 'error',
                code: 'error',
            });
        }
    }, [error]);

    // cleanup data on unmount
    useEffect(
        () => () => {
            dispatch({
                type: UNLOAD,
            });
        },
        [],
    );

    return (
        <Layout
            title={entity.getDisplayName()}
            actions={
                <>
                    <Button
                        type="button"
                        onClick={() =>
                            dispatch(
                                push(
                                    `/data/${encodeURIComponent(
                                        entity.getName(),
                                    )}/new/`,
                                ),
                            )
                        }
                    >
                        Add
                    </Button>
                </>
            }
        >
            <List
                entity={entity}
                data={data || []}
                count={count}
                {...pageParams}
                sort={{
                    field: pageParams.sort[0] || null,
                    way: pageParams.sort[1] || null,
                }}
                onPageChange={page =>
                    dispatch(
                        push(
                            putSearchParameters(route.location.search, {
                                page,
                            }),
                        ),
                    )
                }
                onSortChange={sort =>
                    dispatch(
                        push(
                            putSearchParameters(route.location.search, {
                                sort: `${sort.field}:${sort.way}`,
                            }),
                        ),
                    )
                }
                onActionClick={(action, item) => {
                    if (action === 'edit') {
                        dispatch(
                            push(
                                `/data/${encodeURIComponent(
                                    entity.getName(),
                                )}/${encodeURIComponent(item.code)}/`,
                            ),
                        );
                    }
                    if (action === 'delete') {
                        dispatch({
                            type: DELETE,
                            payload: {
                                entity,
                                code: item.code,
                                client,
                                ...pageParams,
                            },
                        });
                    }
                }}
            />
        </Layout>
    );
};

export default withNotification(
    withClient(
        connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
    ),
);
