import React from 'react';
import { Container, Top, Middle, Footer, Left, Right } from './style.js';
import Menu from '../Menu';

export default ({ children }) => (
    <Container>
        <Top />
        <Middle>
            <Left>
                <Menu />
            </Left>
            <Right>{children}</Right>
        </Middle>
        <Footer />
    </Container>
);
