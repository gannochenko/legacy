import React, { FunctionComponent } from 'react';
import { BooleanContainer, Empty } from './style';
import { ListCellProperties } from '../type';

export const BooleanCell: FunctionComponent<ListCellProperties> = ({
    cell,
    value,
}) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    const display = v => (v ? '✅' : '❌');
    value = cell.multiple ? value.map(display).join(', ') : display(value);

    return <BooleanContainer>{value}</BooleanContainer>;
};
