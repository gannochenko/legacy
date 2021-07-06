import React, { FC } from 'react';
import { LayoutRoot, LayoutBody } from './style';
import { LayoutPropsType } from './type';
import { LayoutHeader, LayoutFooter } from '../index';
import { CookiePopup } from '../CookiePopup';

export const Layout: FC<LayoutPropsType> = ({ children, props = {} }) => {
    const { location: { pathname = '' } = {} } = props;

    const isRoot = pathname === '/';

    return (
        <LayoutRoot>
            <LayoutHeader short={!isRoot} />
            <LayoutBody>{children}</LayoutBody>
            <LayoutFooter />
            <CookiePopup />
        </LayoutRoot>
    );
};

export default Layout;
