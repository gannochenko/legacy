import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';
import { useErrorNotification, useDispatchUnload } from '../../lib/hooks';
import { withClient } from '../../lib/client';
import { parseSearch } from '../../lib/util';
import Button from '../../material-kit/CustomButtons';
import mapDispatchToProps from './dispatch';
import { extractPageParameters } from './util';

import { DataPageProperties } from './type';

import { Layout, List } from '../../components';
import { Entity, EntityItemData } from '../../lib/project-minimum-core';

const DataPageComponent: FunctionComponent<DataPageProperties> = ({
    client,
    route,
    schema,
    data = [],
    count = 0,
    error = null,
    notify = () => {},
    dispatchLoad = () => {},
    dispatchUnload = () => {},
    dispatchNavigateToDetail = () => {},
    dispatchDelete = () => {},
    dispatchUpdateSearch = () => {},
}) => {
    const search = useMemo(
        () => (route ? parseSearch(route.location.search) : ''),
        [route],
    );
    const pageParams = extractPageParameters(search);

    useDispatchUnload(dispatchUnload);
    useErrorNotification(error, notify);

    let entity: Nullable<Entity> = null;
    if (schema) {
        entity = schema.getEntity(_.get(route, 'match.params.entity_name'));
    }

    let entityName = '';
    if (entity) {
        entityName = entity.getName();
    }

    // load data on component mount
    useEffect(() => {
        if (entity) {
            dispatchLoad(client, { entity, pageParams });
        }
    }, [entityName, search]);

    if (!entity) {
        return null;
    }

    return (
        <Layout
            title={entity.getDisplayName()}
            actions={
                <>
                    <Button
                        type="button"
                        onClick={() =>
                            dispatchNavigateToDetail(entity as Entity)
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
                    dispatchUpdateSearch(route, {
                        page,
                    })
                }
                onSortChange={sort =>
                    dispatchUpdateSearch(route, {
                        sort: `${sort.field}:${sort.way}`,
                    })
                }
                onActionClick={(action: string, item: EntityItemData) => {
                    const { code } = item;
                    if (action === 'edit') {
                        dispatchNavigateToDetail(entity as Entity, code);
                    }
                    if (action === 'delete') {
                        dispatchDelete(
                            client,
                            entity as Entity,
                            code,
                            pageParams,
                        );
                    }
                }}
            />
        </Layout>
    );
};

export default withNotification(
    withClient(
        connect(
            s => ({ ...s.data, schema: s.application.index }),
            mapDispatchToProps,
        )(DataPageComponent),
    ),
);
