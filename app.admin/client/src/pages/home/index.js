import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';

import Button from '../../components/material-kit/CustomButtons';

const HomePage = ({ dispatch }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
        });
    }, []);

    return (
        <>
            <Button>Click me</Button>
            <Button>And me</Button>
        </>
    );
};

export default connect(x => x.home)(HomePage);
