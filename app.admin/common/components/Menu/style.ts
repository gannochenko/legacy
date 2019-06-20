import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { group, ellipsis, stdLink } from 'sc-companion';
import { withTheme } from '../../style/global';

export const Container = withTheme(styled.div`
    padding: 1rem;
    ${group('1rem')}
`);

export const Section = styled.div``;

export const Title = withTheme(styled.div`
    font-size: 0.9rem;
    color: ${props => props.theme.menu.subHeader.color};
`);

export const Item = withTheme(styled(Link)`
    font-size: 1rem;
    display: block;
    ${props => stdLink(props.theme.link)}
    ${ellipsis()}
    max-width: 12rem;
`);
