import React from 'react';
import { Link } from 'react-router-dom';
import { ListCellCode } from './style.js';

export default ({ field, value, entity }) => {
    if (typeof value === 'undefined' || value === null) {
        return null;
    }

    value = field.isMultiple() ? value.join(', ') : value;

    return (
        <ListCellCode>
            <Link to={`/data/${entity.getName()}/${value}/`}>{value}</Link>
        </ListCellCode>
    );
};
