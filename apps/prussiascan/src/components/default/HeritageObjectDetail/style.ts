import styled from 'styled-components';
import {
    absoluteCover,
    marginProps,
    reset,
    muiSpacing,
} from '@gannochenko/ui.styled-components';
import { propsBlocker } from '../../../util';

import { HeritageObjectDetailRootPropsType } from './type';
import { GatsbyImage } from 'gatsby-plugin-image';

export const HeritageObjectDetailRoot = styled.div.withConfig(
    propsBlocker,
)<HeritageObjectDetailRootPropsType>`
    ${reset};
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

export const HeritageObjectDetailData = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: ${muiSpacing(20)};
`;

export const HeritageObjectDetailTitle = styled.h1`
    max-width: 60%;
`;

export const HeritageObjectDetailGerman = styled.span`
    margin-top: ${muiSpacing(3)};
`;

export const HeritageObjectDetailLocation = styled.span`
    margin-top: ${muiSpacing(3)};
`;

export const HeritageObjectDetailBadges = styled.span`
    margin-top: ${muiSpacing(10)};
    font-size: 0.8rem;
`;
