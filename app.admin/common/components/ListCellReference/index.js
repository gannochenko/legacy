import React from 'react';
import { ListCellReferenceContainer, Empty } from './style';

const ListCellReference = ({ field, value }) => {
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

    return <ListCellReferenceContainer>{value}</ListCellReferenceContainer>;
};

export default ListCellReference;
