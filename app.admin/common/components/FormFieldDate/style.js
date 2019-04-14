import styled from 'styled-components';
import { withTheme } from '../../style/global';
import { stdInput } from 'sc-companion';

export const Input = withTheme(styled.input`
    width: 100%;
    ${props => stdInput(props.theme.input, !!props.error)}
`);

export const DatePickerPanel = withTheme(styled.div`
    background-color: white;
    border: 1px solid ${props => props.theme.input.color.hout};
    border-radius: 2px;
`);
