import React from 'react';
import moment from 'moment';
import { ListCellDate, Empty } from './style.js';

export default ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    const format = 'DD.MM.YYYY HH:m:s';
    value = field.isMultiple()
        ? value.map(item => moment(item).format(format)).join(', ')
        : moment(value).format(format);

    return <ListCellDate>{value}</ListCellDate>;
};
