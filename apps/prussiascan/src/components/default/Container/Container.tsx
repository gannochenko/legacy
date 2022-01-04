import React, { FC } from 'react';
import {
    heightProps,
    HeightPropsType,
    muiSpacing,
    getPropsBlocker,
} from '@gannochenko/ui.emotion';
import { Container as MUIContainer } from '@mui/material';
import styled from 'styled-components';

import { ContainerPropsType } from './type';

const ContainerRoot = styled(MUIContainer).withConfig(
    getPropsBlocker,
)<HeightPropsType>`
    padding-left: ${muiSpacing(5)};
    padding-right: ${muiSpacing(5)};
    ${heightProps};
`;

export const Container: FC<ContainerPropsType> = ({ children, ...props }) => {
    return <ContainerRoot {...props}>{children as any}</ContainerRoot>;
};

Container.defaultProps = {
    maxWidth: 'lg',
};
