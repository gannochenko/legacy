import styled from 'styled-components';
import { align, group, stdInput, icon, fgColor } from 'sc-companion';
import { withTheme } from '../../style/global';

export const DatePicker = styled.div``;

export const Selectors = styled.div`
    ${align('center', 'left')}
    ${group(0, '0.5rem')}
`;

export const Month = withTheme(styled.select`
    ${props => stdInput(props.theme.input)}
    appearance: none;
`);

export const YearInput = withTheme(styled.input`
    ${props => stdInput(props.theme.input)}
    width: 5rem;
`);

export const Add = withTheme(styled.div`
    ${icon('add_circle', '1.5rem')}
    line-height: 100%;
    ${props =>
        fgColor(
            props.theme.button.color.hover,
            props.theme.button.color.hout,
            '200ms',
        )}
    cursor: pointer;
`);

export const Remove = withTheme(styled.div`
    ${icon('remove_circle', '1.5rem')}
    line-height: 100%;
    ${props =>
        fgColor(
            props.theme.button.color.hover,
            props.theme.button.color.hout,
            '200ms',
        )}
    cursor: pointer;
`);
