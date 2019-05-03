import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
// import { stringify, parse } from '@m59/qs';
import { LOAD, UNLOAD } from './reducer';
import { withClient } from '../../lib/client';
import List from '../../components/List';
import { putSearchParameters, parseSearch } from '../../lib/util';
import { push } from 'connected-react-router';
import Button from '../../material-kit/CustomButtons';

import Layout from '../../components/Layout';

const pageSize = 10;

const DataPage = ({
    dispatch,
    client,
    route,
    schema,
    ready,
    loading,
    data,
    count,
}) => {
    const entityName = _.get(route, 'match.params.entity_name');
    const entity = schema.getEntity(entityName);

    if (!entity) {
        return null;
    }

    const search = useMemo(() => parseSearch(route.location.search), [
        route.location.search,
    ]);

    const page = search.page || 1;
    let sort = search.sort;
    if (_.isne(sort)) {
        sort = sort.split(':');
    } else {
        sort = [];
    }

    // load data on component mount
    useEffect(() => {
        dispatch({
            type: LOAD,
            payload: {
                client,
                entity,
                page,
                pageSize,
                sort,
            },
        });
    }, [entity.getName(), search]);

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
                page={page}
                pageSize={pageSize}
                sort={{ field: sort[0] || null, way: sort[1] || null }}
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
                    }
                }}
            />
        </Layout>
    );
};

export default withClient(
    connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
);
