import React from 'react';
import { VerticalTriplet } from 'ew-internals-ui';

import {
    Top,
    Middle,
    Footer,
    Left,
    Right,
    Logo,
    Header,
    Title,
    Actions,
} from './style.js';
import Menu from '../Menu';

export default ({ children, title, actions }) => (
    <VerticalTriplet
        top={
            <Top>
                <Logo to="/">
                    <div>MIN</div>
                </Logo>
            </Top>
        }
        bottom={
            <Footer>
                &copy; 2019 Project &laquo;Minimum&raquo; &mdash; a minimalistic
                GraphQL backend
            </Footer>
        }
    >
        <Middle>
            <Left>
                <Menu />
            </Left>
            <Right>
                <Header>
                    <Title>{title || 'Untitled page'}</Title>
                    {!!actions && <Actions>{actions}</Actions>}
                </Header>
                {children}
            </Right>
        </Middle>
    </VerticalTriplet>
);
