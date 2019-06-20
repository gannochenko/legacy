import styled from 'styled-components';
import { stdInput } from 'sc-companion';
import { withTheme } from '../../style/global';

export const Checkbox = withTheme(styled.a`
    ${props =>
        stdInput({ padding: '2px', ...props.theme.input }, false, props.focus)}
    width: 3rem;
    height: 31px;
    position: relative;
    cursor: pointer;
    background: white;
    display: block;
`);

export const Check = withTheme(styled.div`
    position: absolute;
    border-radius: 2px;
    background-color: ${props =>
        props.checked
            ? props.theme.checkbox.color.hover
            : props.theme.checkbox.color.hout};
    width: 50%;
    top: 2px;
    bottom: 2px;
    ${props => `left: ${props.checked ? 'calc(50% - 2px)' : '2px'};`}
    transition: left ease 200ms;
`);
