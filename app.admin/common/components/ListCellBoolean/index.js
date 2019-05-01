import React from 'react';
import { ListCellBoolean, Empty } from './style.js';

export default ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    const display = value => (value ? '✅' : '❌');
    value = field.isMultiple() ? value.map(display).join(', ') : display(value);

    return <ListCellBoolean>{value}</ListCellBoolean>;
};
