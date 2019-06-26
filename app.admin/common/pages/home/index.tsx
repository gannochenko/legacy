import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { withNotification } from 'ew-internals-ui';

import { Layout } from '../../components';
import { withClient } from '../../lib/client';

import mapDispatchToProps from './dispatch';
import { useErrorNotification } from '../../lib/hooks';
import { HomePageProperties } from './type';

const HomePage: FunctionComponent<HomePageProperties> = ({
    client,
    error = null,
    notify = () => {},
    dispatchLoad = () => {},
}) => {
    useEffect(() => {
        dispatchLoad(client);
    }, []);
    useErrorNotification(error, notify);

    return <Layout title="Hello from Admin" />;
};

export default withNotification(
    withClient(
        connect(
            x => x.home,
            mapDispatchToProps,
        )(HomePage),
    ),
);
