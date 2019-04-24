import styled from 'styled-components';
import { align } from 'sc-companion';
import { withTheme } from '../../style/global';

export const FormField = styled.div`
    max-width: 20rem;
`;

export const Label = styled.div`
    margin-bottom: 0.5rem;
`;

export const Footer = styled.div`
    margin-top: 0.2rem;
    ${align('top', 'left')}
    min-height: 1.2rem;
`;

export const Error = withTheme(styled.div`
    ${props => `font-size: ${props.theme.font.xSmall};`}
    flex-grow: 2;
    color: ${props => props.theme.error.color};
`);

export const Actions = styled.div`
    padding-left: 1rem;
`;

export const RedStar = withTheme(styled.span`
    color: ${props => props.theme.error.color};
`);
