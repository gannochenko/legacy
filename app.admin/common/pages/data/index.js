import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';
import { useErrorNotification, useDispatchUnload } from '../../lib/hooks';
import { withClient } from '../../lib/client';
import List from '../../components/List';
import { parseSearch } from '../../lib/util';
import Button from '../../material-kit/CustomButtons';
import mapDispatchToProps from './dispatch';
import { extractPageParameters } from './util';

import Layout from '../../components/Layout';

const DataPage = ({
    client,
    route,
    schema,
    data,
    count,
    error,
    notify,
    dispatchLoad,
    dispatchUnload,
    dispatchNavigateToDetail,
    dispatchDelete,
    dispatchUpdateSearch,
}) => {
    if (!schema) {
        return null;
    }

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
        dispatchLoad(client, entity, pageParams);
    }, [entity.getName(), search]);
    useDispatchUnload(dispatchUnload);
    useErrorNotification(error, notify);

    return (
        <Layout
            title={entity.getDisplayName()}
            actions={
                <>
                    <Button
                        type="button"
                        onClick={() => dispatchNavigateToDetail(entity)}
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
                onActionClick={(action, item) => {
                    if (action === 'edit') {
                        dispatchNavigateToDetail(entity, item.code);
                    }
                    if (action === 'delete') {
                        dispatchDelete(client, entity, item.code, pageParams);
                    }
                }}
            />
        </Layout>
    );
};

export default withNotification(
    withClient(
        connect(
            s => ({ ...s.data, schema: s.application.schema }),
            mapDispatchToProps,
        )(DataPage),
    ),
);
