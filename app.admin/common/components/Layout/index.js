import React from 'react';
import { VerticalTriplet } from 'ew-internals-ui';

import { Top, Middle, Footer, Left, Right, Logo, Header } from './style.js';
import Menu from '../Menu';

export default ({ children, title }) => (
    <VerticalTriplet
        top={
            <Top>
                <Logo to="/">A</Logo>
            </Top>
        }
        bottom={<Footer />}
    >
        <Middle>
            <Left>
                <Menu />
            </Left>
            <Right>
                {!!title && <Header>{title}</Header>}
                {children}
            </Right>
        </Middle>
    </VerticalTriplet>
);
