import React, { FunctionComponent } from 'react';
import moment from 'moment';
import { DateContainer, Empty } from './style';
import { CellProperties } from '../type';

export const DateTimeCell: FunctionComponent<CellProperties> = ({
    cell,
    value,
}) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    const format = 'DD.MM.YYYY HH:m:s';
    value = cell.multiple
        ? value.map(item => moment(item).format(format)).join(', ')
        : moment(value).format(format);

    return <DateContainer>{value}</DateContainer>;
};
