import React, { FunctionComponent } from 'react';
import { ListCellCodeContainer, Link } from './style';

import { ListCellProperties } from '../../../components/List/Cell/type';

export const ListCellCode: FunctionComponent<ListCellProperties> = ({
    cell: { reference: { field, entity } = {} },
    value,
}) => {
    if (typeof value === 'undefined' || value === null || !field || !entity) {
        return null;
    }

    value = field.isMultiple() ? value.join(', ') : value;

    return (
        <ListCellCodeContainer>
            <Link
                to={`/data/${encodeURIComponent(
                    entity.getName(),
                )}/${encodeURIComponent(value)}/`}
            >
                {value}
            </Link>
        </ListCellCodeContainer>
    );
};
