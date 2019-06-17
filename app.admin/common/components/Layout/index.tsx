import React from 'react';
import { object } from 'prop-types';
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
} from './style';
import Menu from '../Menu';

const Layout = ({ children, title, actions }) => (
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
                    <Title>{title}</Title>
                    {!!actions && <Actions>{actions}</Actions>}
                </Header>
                {children}
            </Right>
        </Middle>
    </VerticalTriplet>
);

Layout.propTypes = {
    title: object,
    actions: object,
    children: object,
};

Layout.defaultProps = {
    title: 'Untitled page',
};

export default Layout;
