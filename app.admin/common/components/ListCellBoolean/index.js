import React from 'react';
import { ListCellBooleanContainer, Empty } from './style';

const ListCellBoolean = ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    const display = value => (value ? '✅' : '❌');
    value = field.isMultiple() ? value.map(display).join(', ') : display(value);

    return <ListCellBooleanContainer>{value}</ListCellBooleanContainer>;
};

export default ListCellBoolean;
