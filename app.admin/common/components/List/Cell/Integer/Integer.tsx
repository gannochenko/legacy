import React, { FunctionComponent } from 'react';
import { IntegerContainer, Empty } from './style';
import { CellProperties } from '../type';

export const IntegerCell: FunctionComponent<CellProperties> = ({
    cell,
    value,
}) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    value = cell.multiple ? value.join(', ') : value;

    return <IntegerContainer>{value}</IntegerContainer>;
};
