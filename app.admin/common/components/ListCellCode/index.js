import React from 'react';
import { ListCellCode, Link } from './style.js';

export default ({ field, value, entity }) => {
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    value = field.isMultiple() ? value.join(', ') : value;

    return (
        <ListCellCode>
            <Link
                to={`/data/${encodeURIComponent(
                    entity.getName(),
                )}/${encodeURIComponent(value)}/`}
            >
                {value}
            </Link>
        </ListCellCode>
    );
};
