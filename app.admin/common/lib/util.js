import { camel } from 'naming-style';
import { stringify, parse } from '@m59/qs';
import moment from 'moment';

// todo: move to ew-internals
export const convertToCamel = str => {
    str = camel(str.toLowerCase());
    return `${str.substr(0, 1).toUpperCase()}${str.substr(1, str.length - 1)}`;
};

export const putSearchParameters = (url, params) => {
    return `?${stringify(
        Object.assign({}, parse(url.replace(/^\?/, '')), params),
    )}`;
};

export const parseSearch = url => parse(url.replace(/^\?/, ''));

// todo: move to ew-internals
export const sanitize = str => str.replace(/[^a-z0-9_-]/gi, '');
export const escapeQuote = str => str.replace(/"/g, '"');

// todo: move to ew-internals
export const getCalendar = (date, chosenDate = null) => {
    let b = moment.utc(date);
    let f = moment.utc(date);

    const cMonth = f.month();
    const timeLine = [];

    let isChosenMonthYear = null;
    let chosenMonth = null;
    let chosenYear = null;
    if (chosenDate) {
        if (_.isne(chosenDate)) {
            chosenDate = new Date(chosenDate);
        }
        chosenMonth = chosenDate.getUTCMonth();
        chosenYear = chosenDate.getUTCFullYear();
        chosenDate = chosenDate.getUTCDate();
        isChosenMonthYear =
            b.month() === chosenMonth && b.year() === chosenYear;
    }

    // generate our calendar grid backward
    let i = 0;
    let pad = 1;
    let decreasePad = false;
    while (i < 50) {
        b = b.add(-1, 'day');

        if (cMonth !== b.month() && !decreasePad) {
            // went out of the chosen month borders, now need to pad
            // console.dir('bday = '+b.day());
            pad = b.day();
            decreasePad = true;
        }

        if (pad <= 0) {
            break;
        }

        timeLine.unshift({
            key: `${b.date()}-${b.month()}-${b.year()}`,
            weekDay: b.day(),
            day: b.date(),
            month: b.month(),
            year: b.year(),
            selected:
                !decreasePad && isChosenMonthYear && b.date() === chosenDate,
            currentMonth: b.year() === chosenYear && b.month() === chosenMonth,
        });

        if (decreasePad) {
            pad -= 1;
        }
        i += 1; // emergency exit
    }

    i = 0;
    pad = 1;
    decreasePad = false;
    while (i < 50) {
        timeLine.push({
            key: `${f.date()}-${f.month()}-${f.year()}`,
            weekDay: f.day(),
            day: f.date(),
            month: f.month(),
            year: f.year(),
            selected:
                !decreasePad && isChosenMonthYear && f.date() === chosenDate,
            currentMonth: f.year() === chosenYear && f.month() === chosenMonth,
        });

        f = f.add(1, 'day');
        if (cMonth !== f.month() && !decreasePad) {
            // went out of the chosen month borders, now need to pad
            // we pad to 6 full weeks to display: 6 weeks * 7 days = 42 days to display
            pad = 42 - timeLine.length;
            decreasePad = true;
        }

        if (pad <= 0) {
            break;
        }

        if (decreasePad) {
            pad -= 1;
        }
        i += 1; // emergency exit
    }

    // now group by weeks
    const byWeeks = [];
    let cWeek = [];
    timeLine.forEach(day => {
        if (day.weekDay === 1 && _.iane(cWeek)) {
            // week starts with monday, monday has number 1
            byWeeks.push(cWeek);
            cWeek = [];
        }

        cWeek.push(day);
    });
    // push the last if not empty, just in case...
    if (_.iane(cWeek)) {
        byWeeks.push(cWeek);
    }

    return {
        cMonth,
        grid: byWeeks,
    };
};

export const convertLocalDateToUTC = date => {
    if (!date) {
        return null;
    }

    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds(),
        ),
    );
};

export const convertUTCToDate = date => {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
    );
};
