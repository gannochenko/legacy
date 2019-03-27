import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Badge from '../../components/MaterialKit/Badge/index.jsx';
import { LOAD } from './reducer';

const HomePage = ({ dispatch }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
        });
    }, []);

    return (
        <div>
            Hello!
            <Badge>Default</Badge>
        </div>
    );
};

export default connect(x => x.home)(HomePage);
