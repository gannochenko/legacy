import styled from 'styled-components';
import { withTheme } from '../../style/global';
import { stdInput } from '../../to-npm';

export const Input = withTheme(styled.input`
    width: 100%;
    ${props => stdInput(props.theme.input, !!props.error)}
`);
