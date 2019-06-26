import styled from 'styled-components';
import { group, stdLink } from 'sc-companion';
import { withTheme } from '../../style/global';

export const FormContainer = styled.div``;

export const Fields = styled.div`
    ${group('0.5rem')}
`;

export const ButtonWrap = styled.div`
    display: inline-block;
`;

export const DeleteButton = withTheme(styled.div`
    ${props => stdLink(props.theme.link)}
    display: inline-block;
`);

export const FormButtons = styled.div`
    ${group(null, '1rem')}
`;
