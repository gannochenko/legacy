import React from 'react';
import { ListCellString } from './style.js';

export default ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    value = field.isMultiple() ? value.join(', ') : value;

    return <ListCellString>{value}</ListCellString>;
};
