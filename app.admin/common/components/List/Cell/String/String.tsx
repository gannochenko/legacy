import React, { FunctionComponent } from 'react';
import { StringContainer, Empty } from './style';
import { CellProperties } from '../type';

export const StringCell: FunctionComponent<CellProperties> = ({
    cell,
    value,
}) => {
    if (typeof value === 'undefined' || value === null) {
        return <Empty>&mdash;</Empty>;
    }

    value = cell.multiple ? value.join(', ') : value;

    return <StringContainer>{value}</StringContainer>;
};
