import React, { FunctionComponent } from 'react';
import { IntegerContainer, Empty } from './style';
import { ListCellProperties } from '../type';

export const IntegerCell: FunctionComponent<ListCellProperties> = ({
    cell,
    value,
}) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    value = cell.multiple ? value.join(', ') : value;

    return <IntegerContainer>{value}</IntegerContainer>;
};
