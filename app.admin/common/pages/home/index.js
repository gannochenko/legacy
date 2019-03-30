import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LOAD } from './reducer';

import Button from '../../material-kit/CustomButtons';
import Mushroom from '../../../public/mushroom.png';
import { Container, CoinRow, Coin } from './style';

const HomePage = ({ dispatch }) => {
    useEffect(() => {
        dispatch({
            type: LOAD,
        });
    }, []);

    return (
        <Container>
            <h1>Hello from Admin</h1>
            <p>
                This is a demo page. If you see this page, it means that at
                least <code>react</code>, <code>react-router</code>,{' '}
                <code>redux</code> and <code>redux-saga</code> work properly.
            </p>
            <p>
                If you see this big mushroom, it means that static assets are
                being served normally:
                <br />
                <img src="/mushroom.png" width="50" height="50" />
            </p>
            <p>
                And if you see a second big mushroom, that indicates that{' '}
                <code>url-loader</code> plugin works as expected:
                <br />
                <img src={Mushroom} width="50" height="50" />
            </p>
            <p>
                If the following button is gray and shadow-ish, then{' '}
                <code>jss</code> plugin works:
                <br />
                <Button>I am a gray button</Button>
            </p>
            <p>
                If you see three coins in a row below, then{' '}
                <code>styled-components</code> and <code>sc-companion</code>{' '}
                modules are allright:
                <br />
                <CoinRow>
                    <Coin />
                    <Coin />
                    <Coin />
                </CoinRow>
            </p>
            <p>Enjoy!</p>
            <br />
        </Container>
    );
};

export default connect(x => x.home)(HomePage);
