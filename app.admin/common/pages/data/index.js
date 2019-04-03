import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';
import { withSettings } from '../../lib/settings';
import List from '../../components/List';

// import Button from '../../material-kit/CustomButtons';
import Layout from '../../components/Layout';

const DataPage = ({ dispatch, settings, route, structure }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
            settings,
        });
    }, []);

    const entityName = _.get(route, 'match.params.entity_name');
    const entity = structure.get(entityName);

    console.dir(entityName);
    console.dir(entity);

    return (
        <Layout title="Data here">
            <List />
        </Layout>
    );
};

export default withSettings(
    connect(s => ({ ...s.data, structure: s.application.structure }))(DataPage),
);
