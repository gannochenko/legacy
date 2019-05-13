import styled from 'styled-components';
import { align, group, stdInput, icon, fgColor, rectangle } from 'sc-companion';
import { withTheme } from '../../style/global';
import { borderColor } from '../../to-npm/mixin';

export const DatePickerContainer = styled.div``;

export const Selectors = withTheme(styled.div`
    padding: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.input.color.hout};
`);

export const SelectorsWrapper = styled.div`
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

export const Increase = withTheme(styled.div`
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

export const Decrease = withTheme(styled.div`
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

export const Calendar = styled.div`
    ${group('0.5rem')}
    padding: 0.5rem;
`;

export const CalendarRow = styled.div``;

export const CalendarRowWrap = styled.div`
    ${group(0, '0.5rem')}
    ${align('top', 'left')}
`;

export const CalendarDay = withTheme(styled.div`
    ${align('center', 'right')}
    ${rectangle('1.7rem')}
    padding: 0.3rem;
    border-radius: 2px;
    cursor: pointer;
    border: 1px solid red;
    ${props =>
        borderColor(
            props.theme.input.color.hout,
            props.theme.input.color.hover,
        )}
    user-select: none;
    ${props =>
        props.selected
            ? `color: ${props.theme.input.color.hover};`
            : !props.current
            ? `color: ${props.theme.input.color.hout};`
            : ''}
`);

export const WeekDays = styled.div`
    ${group(0, '0.5rem')}
    ${align('top', 'left')}
    user-select: none;
`;

export const WeekDay = styled.div`
    ${align('center', 'center')}
    ${rectangle('1.7rem')}
    padding: 0.3rem;
    font-size: 0.5rem;
`;
