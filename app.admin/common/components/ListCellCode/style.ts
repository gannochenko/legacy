import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { stdLink } from 'sc-companion';
import { withTheme } from '../../style/global';

export const ListCellCodeContainer = styled.div`
    font-size: 0.6rem;
`;

export const Link = withTheme(styled(RouterLink)`
    ${props => stdLink(props.theme.link)}
`);
