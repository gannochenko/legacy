import React from 'react';
import { ListCellString, Empty } from './style.js';

export default ({ field, value }) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    value = field.isMultiple() ? value.join(', ') : value;

    return <ListCellString>{value}</ListCellString>;
};
