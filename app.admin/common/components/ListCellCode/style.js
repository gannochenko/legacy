import styled from 'styled-components';
import { stdLink, withTheme } from '../../style/global';
import { Link as RouterLink } from 'react-router-dom';
// import {
//   align
// } from 'sc-companion';

export const ListCellCode = styled.div`
    font-size: 0.6rem;
`;

export const Link = withTheme(styled(RouterLink)`
    ${props =>
        stdLink(props.theme.link.color.hover, props.theme.link.color.hout)}
`);
