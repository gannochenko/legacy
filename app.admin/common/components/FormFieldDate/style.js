import styled from 'styled-components';
import { withTheme, stdInput } from '../../style/global';

export const Input = withTheme(styled.input`
    width: 100%;
    ${props => stdInput(props.theme.input.color, !!props.error)}
`);
