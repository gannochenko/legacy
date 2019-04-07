import React from 'react';
import { ListCellBoolean } from './style.js';

export default ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    const display = value => (value ? '✅' : '❌');
    value = field.isMultiple() ? value.map(display).join(', ') : display(value);

    return <ListCellBoolean>{value}</ListCellBoolean>;
};
