import React from 'react';
import { ListCellCodeContainer, Link } from './style';

export const ListCellCode = ({ field, value, entity }) => {
    if (typeof value === 'undefined' || value === null) {
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
