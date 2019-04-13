import styled from 'styled-components';
import { withTheme, stdInput } from '../../style/global';
// import {
//   align
// } from 'sc-companion';

// export const FormFieldString = styled.div`
// 	max-width: 20rem;
// `;

export const Input = withTheme(styled.input`
    width: 100%;
    ${props => stdInput(props.theme.input.color, !!props.error)}
`);
