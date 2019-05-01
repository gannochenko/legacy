import styled from 'styled-components';
import { align, rectangle, group } from 'sc-companion';
import { Link } from 'react-router-dom';
import { withTheme } from '../../style/global';

export const Top = styled.div`
    min-height: 3rem;
    border-bottom: 1px solid gray;
    padding: 1rem;
`;

export const Middle = styled.div`
    ${align('stretch', 'left')}
    width: 100%;
`;

export const Footer = withTheme(styled.div`
    padding: 1rem 3rem;
    border-top: 1px solid gray;
    font-size: ${props => props.theme.font.xSmall};
`);

export const Left = styled.div`
    width: 12rem;
    flex-shrink: 0;
`;

export const Right = styled.div`
    padding: 1rem;
    flex-grow: 2;
`;

export const Logo = styled(Link)`
    ${rectangle('2rem')}
    ${align('center', 'center')}
    border: 1px solid gray;
    border-radius: 5px;
    text-decoration: none;
    color: gray;
`;

export const Header = styled.div`
    margin-bottom: 1rem;
    ${align('top', 'left')}
    ${group(null, '1rem')}
`;

export const Title = styled.div`
    font-size: 1.5rem;
    flex-grow: 2;
`;

export const Actions = styled.div``;
