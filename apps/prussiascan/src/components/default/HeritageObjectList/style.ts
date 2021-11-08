import styled from 'styled-components';
import {
    marginProps,
    reset,
    getPropsBlocker,
    muiSpacing,
} from '@gannochenko/ui.styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

import { HeritageObjectListRootPropsType } from './type';

export const HeritageObjectListRoot = styled.div.withConfig(
    getPropsBlocker,
)<HeritageObjectListRootPropsType>`
    ${reset};
    ${marginProps};
`;

export const BlogCard = styled(Link)`
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    display: block;
    min-height: ${muiSpacing(20)};
`;

export const BlogCardImage = styled(GatsbyImage)`
    background-color: #c4c4c4;
    height: 15rem;
`;

export const BlogCardTitle = styled.div`
    background-color: #fff;
    padding: ${muiSpacing(1)} ${muiSpacing(2)};
    position: absolute;
    bottom: ${muiSpacing(1.5)};
    right: 0;
    color: #333;
`;
