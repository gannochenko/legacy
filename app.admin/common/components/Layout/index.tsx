import React, { FunctionComponent } from 'react';
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
import { LayoutProperties } from './type';

import Menu from '../Menu';

const Layout: FunctionComponent<LayoutProperties> = ({
    children = null,
    title = 'Untitled page',
    actions = null,
}) => (
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

export default Layout;
