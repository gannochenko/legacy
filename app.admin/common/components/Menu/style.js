import styled from 'styled-components';
import { group, ellipsis } from 'sc-companion';
import { withTheme, stdLink } from '../../style/global';
import { Link } from 'react-router-dom';

export const Container = withTheme(styled.div`
    padding: 1rem;
    ${group('1rem')}
`);

export const Section = styled.div``;

export const Title = withTheme(styled.div`
    font-size: 0.9rem;
    color: ${props => props.theme.menu.subHeader.color};
`);

export const Item = styled(Link)`
    font-size: 1rem;
    display: block;
    ${stdLink()}
    ${ellipsis()}
    max-width: 12rem;
`;
