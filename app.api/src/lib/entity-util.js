import md5 from 'md5';
import {
    DB_IDENTIFIER_LENGTH,
    DB_REF_TABLE_PREFIX,
    DB_ENTITY_TABLE_PREFIX,
} from '../constants';

export const getTableName = entity => {
    return `${DB_ENTITY_TABLE_PREFIX}${entity.name.toLowerCase()}`.substr(
        0,
        DB_IDENTIFIER_LENGTH,
    );
};

export const getRefName = (entity, field) => {
    return `${entity.name}_2_${field.name}`;
};

export const getRefTableName = (entity, field) => {
    return `${DB_REF_TABLE_PREFIX}${md5(`${entity.name}_${field.name}`)}`;
};
