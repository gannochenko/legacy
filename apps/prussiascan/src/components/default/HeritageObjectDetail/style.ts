import styled, { css } from 'styled-components';
import {
    absoluteCover,
    marginProps,
    reset,
} from '@gannochenko/ui.styled-components';
import { propsBlocker } from '../../../util';

import { HeritageObjectDetailRootPropsType } from './type';
import { GatsbyImage } from 'gatsby-plugin-image';

const getRootStyle = (props: HeritageObjectDetailRootPropsType) => {
    const result = {};

    // if (propA) {
    //     result = css`
    //         ${result};
    //         color: grey;
    //         // some other css
    //     `;
    // }

    return result;
};

export const HeritageObjectDetailRoot = styled.div.withConfig(
    propsBlocker,
)<HeritageObjectDetailRootPropsType>`
    ${reset};
    ${getRootStyle};
    ${marginProps};
`;

export const HeritageObjectDetailImageLink = styled.a`
    display: block;
    max-height: 300px;
    max-width: 300px;
`;

export const HeritageObjectDetailImage = styled(GatsbyImage)`
    border-radius: 2px;
`;

export const HeritageObjectDetailHeaderBackgroundImage = styled(GatsbyImage)`
    ${absoluteCover()};
    user-select: none;
    position: absolute !important;
`;
