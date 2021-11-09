import styled from 'styled-components';
import { muiSpacing } from '@gannochenko/ui.styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

export const HeritageObjectListRoot = styled.div``;

export const HeritageObjectListItem = styled(Link)`
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    display: block;
    min-height: ${muiSpacing(20)};
`;

export const HeritageObjectListItemImage = styled(GatsbyImage)`
    background-color: #c4c4c4;
    height: 15rem;
`;

export const HeritageObjectListItemName = styled.div`
    background-color: #fff;
    padding: ${muiSpacing(1)} ${muiSpacing(2)};
    position: absolute;
    bottom: ${muiSpacing(1.5)};
    right: 0;
    color: #333;
`;
