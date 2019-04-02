import styled from 'styled-components';
import { align, rectangle } from 'sc-companion';
import { Link } from 'react-router-dom';
import { withTheme } from '../../style/global';

export const Container = styled.div`
    ${align('top', 'stretch', 'column')}
    height: 100%;
`;

export const Top = styled.div`
    min-height: 3rem;
    flex-shrink: 0;
    border-bottom: 1px solid gray;
    padding: 1rem;
`;

export const Middle = styled.div`
    ${align('top', 'left')}
    flex-grow: 2;
`;

export const Footer = withTheme(styled.div`
    height: 5rem;
    flex-shrink: 0;
    background-color: ${props => props.theme.footer.background.color};
`);

export const Left = styled.div`
    width: 12rem;
`;

export const Right = styled.div`
    padding: 0 5rem 0 1rem;
`;

export const Logo = styled(Link)`
    ${rectangle('2rem')}
    border: 1px solid gray;
    border-radius: 5px;
    display: block;
    text-align: center;
    text-decoration: none;
    color: gray;
`;
