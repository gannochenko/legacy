import styled from 'styled-components';
import { align } from 'sc-companion';
import { withTheme } from '../../style/global';

import { stdInput } from '../../to-npm';

export const DatePicker = styled.div``;

export const Selectors = styled.div`
    ${align('center', 'left')}
`;

export const Month = withTheme(styled.select`
    ${props => stdInput(props.theme.input)}
    appearance: none;
`);

export const Year = styled.div``;

export const YearInput = styled.input``;

export const YearButtons = styled.div``;

export const Add = styled.div``;

export const Remove = styled.div``;
