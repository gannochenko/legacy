import React from 'react';

import {
    Container,
    Top,
    Middle,
    Footer,
    Left,
    Right,
    Logo,
    Header,
} from './style.js';
import Menu from '../Menu';

export default ({ children, title }) => (
    <Container>
        <Top>
            <Logo to="/">A</Logo>
        </Top>
        <Middle>
            <Left>
                <Menu />
            </Left>
            <Right>
                {!!title && <Header>{title}</Header>}
                {children}
            </Right>
        </Middle>
        <Footer />
    </Container>
);
