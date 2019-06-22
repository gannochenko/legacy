import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';

import { SchemaPageProperties } from './type';

import { withClient } from '../../lib/client';
import Layout from '../../components/Layout';
import { useErrorNotification } from '../../lib/hooks';

const SchemaPage: FunctionComponent<SchemaPageProperties> = ({
    client,
    error,
    notify,
    dispatchLoad,
}) => {
    useEffect(() => {
        dispatchLoad(client);
    }, []);
    useErrorNotification(error, notify);

    return <Layout title="Structure here" />;
};

export default withNotification(withClient(connect(x => x.schema)(SchemaPage)));
