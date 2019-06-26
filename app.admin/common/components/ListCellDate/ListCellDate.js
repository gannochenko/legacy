import React from 'react';
import moment from 'moment';
import { ListCellDateContainer, Empty } from './style';

export const ListCellDate = ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    const format = 'DD.MM.YYYY HH:m:s';
    value = field.isMultiple()
        ? value.map(item => moment(item).format(format)).join(', ')
        : moment(value).format(format);

    return <ListCellDateContainer>{value}</ListCellDateContainer>;
};
