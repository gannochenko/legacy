import styled from 'styled-components';
import { withTheme } from '../../style/global';
import { stdInput } from '../../to-npm';

export const Wrapper = styled.div`
    width: 10rem;
    position: relative;
`;

export const Input = withTheme(styled.input`
    width: 100%;
    ${props => stdInput(props.theme.input, !!props.error)}
`);

export const PickerPanel = withTheme(styled.div`
    position: absolute;
    height: 10rem;
    left: 0;
    top: 100%;
    border: 1px solid ${props => props.theme.input.color.hout};
    background-color: white;
    border-radius: 2px;
    z-index: ${props => props.theme.zIndex.picker};
    padding: 0.5rem;
`);
