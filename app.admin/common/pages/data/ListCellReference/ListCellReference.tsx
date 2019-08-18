import React, { FunctionComponent } from 'react';
import { ListCellReferenceContainer, Empty } from './style';
import { ListCellProperties } from '../../../components/List/Cell/type';

export const ListCellReference: FunctionComponent<ListCellProperties> = ({
    cell: { reference: { field } = {} },
    value,
}) => {
    if (
        !field ||
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
