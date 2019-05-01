import React from 'react';
import { ListCellReference, Empty } from './style.js';

export default ({ field, value }) => {
    if (
        typeof value === 'undefined' ||
        value === null ||
        (_.isArray(value) && !value.length)
    ) {
        return <Empty>&mdash;</Empty>;
    }

    value = field.isMultiple()
        ? value.map(item => item.code).join(', ')
        : value.code;

    return <ListCellReference>{value}</ListCellReference>;
};
