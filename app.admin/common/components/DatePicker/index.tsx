import React, { useMemo, FunctionComponent } from 'react';
import {
    getCalendar,
    convertLocalDateToUTC,
    convertUTCToDate,
} from '../../lib/util';
import {
    DatePickerContainer,
    Selectors,
    SelectorsWrapper,
    Month,
    YearInput,
    Increase,
    Decrease,
    Calendar,
    CalendarRow,
    CalendarRowWrap,
    CalendarDay,
    WeekDays,
    WeekDay,
} from './style';
import { DatePickerProperties } from './type';

const monthList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const wDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DatePicker: FunctionComponent<DatePickerProperties> = ({
    value = Date.now(),
    onChange = () => {},
    onDaySelect = () => {},
}) => {
    const valueUTC = useMemo(() => {
        return convertLocalDateToUTC(new Date(value));
    }, [value]);
    const calendar = useMemo(() => {
        return getCalendar(valueUTC, valueUTC);
    }, [valueUTC]);

    const [month, year] = useMemo(() => {
        return [
            // valueUTC.getUTCDate(),
            valueUTC.getUTCMonth(),
            valueUTC.getUTCFullYear(),
        ];
    }, [valueUTC]);

    return (
        <DatePickerContainer>
            <Selectors>
                <SelectorsWrapper>
                    <Month
                        className="date-picker__selector-month"
                        onChange={e => {
                            valueUTC.setUTCMonth(e.target.value);
                            onChange(convertUTCToDate(valueUTC));
                        }}
                    >
                        {monthList.map((monthName, i) => (
                            <option key={i} value={i} selected={month === i}>
                                {monthName}
                            </option>
                        ))}
                    </Month>
                    <YearInput type="text" value={year} reanOnly />
                    <Decrease
                        onClick={() => {
                            valueUTC.setUTCFullYear(year - 1);
                            onChange(convertUTCToDate(valueUTC));
                        }}
                    />
                    <Increase
                        onClick={() => {
                            valueUTC.setUTCFullYear(year + 1);
                            onChange(convertUTCToDate(valueUTC));
                        }}
                    />
                </SelectorsWrapper>
            </Selectors>
            <Calendar>
                <WeekDays>
                    {wDays.map(wDay => (
                        <WeekDay key={wDay}>{wDay}</WeekDay>
                    ))}
                </WeekDays>
                {calendar.grid.map((week, i) => {
                    return (
                        <CalendarRow key={i}>
                            <CalendarRowWrap>
                                {week.map(day => (
                                    <CalendarDay
                                        key={day.key}
                                        current={day.currentMonth}
                                        selected={day.selected}
                                        onClick={() => {
                                            valueUTC.setUTCDate(day.day);
                                            valueUTC.setUTCMonth(day.month);
                                            onChange(
                                                convertUTCToDate(valueUTC),
                                            );
                                            onDaySelect();
                                        }}
                                    >
                                        {day.day}
                                    </CalendarDay>
                                ))}
                            </CalendarRowWrap>
                        </CalendarRow>
                    );
                })}
            </Calendar>
        </DatePickerContainer>
    );
};

export default DatePicker;
