import styled from 'styled-components';
import { stdInput } from 'sc-companion';
import { withTheme } from '../../style/global';

export const Input = withTheme(styled.input`
    width: 100%;
    ${props => stdInput(props.theme.input, !!props.error)}
`);
