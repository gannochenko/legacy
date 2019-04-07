import React from 'react';
import { ListCellReference } from './style.js';

export default ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    value = field.isMultiple()
        ? value.map(item => item.code).join(', ')
        : value.code;

    return <ListCellReference>{value}</ListCellReference>;
};
