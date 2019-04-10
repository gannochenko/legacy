import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { stringify, parse } from '@m59/qs';
import { LOAD } from './reducer';
import { withClient } from '../../lib/client';
import { withHistory } from '../../lib/history';
import List from '../../components/List';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';

const putSearchParameters = (url, params) => {
    return `?${stringify(
        Object.assign({}, parse(url.replace(/^\?/, '')), params),
    )}`;
};

const parseSearch = url => parse(url.replace(/^\?/, ''));

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
    history,
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

    useEffect(() => {
        dispatch({
            type: LOAD,
            client,
            entity,
            page,
            pageSize,
            sort,
        });
    }, [entity.getName(), search]);

    const notReady = !ready || loading;

    return (
        <Layout title={entity.getDisplayName()}>
            <List
                entity={entity}
                data={notReady ? [] : data}
                count={notReady ? null : count}
                page={page}
                pageSize={pageSize}
                sort={{ field: sort[0] || null, way: sort[1] || null, }}
                onPageChange={page =>
                    history.push(
                        putSearchParameters(route.location.search, { page }),
                    )
                }
                onSortChange={sort => {
	                history.push(
		                putSearchParameters(route.location.search, { sort: `${sort.field}:${sort.way}` }),
	                )
                }}
            />
        </Layout>
    );
};

export default withHistory(
    withClient(
        connect(s => ({ ...s.data, schema: s.application.schema }))(DataPage),
    ),
);
