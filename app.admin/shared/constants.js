export const DB_TABLE_PREFIX = 'eq_';
export const DB_REF_TABLE_PREFIX = `${DB_TABLE_PREFIX}ref_`;
export const DB_ENTITY_TABLE_PREFIX = `${DB_TABLE_PREFIX}e_`;
export const DB_MIGRATION_TABLE_NAME = `${DB_TABLE_PREFIX}migrations`;
export const DB_SCHEMA_TABLE_NAME = `${DB_TABLE_PREFIX}schema`;
export const DB_IDENTIFIER_LENGTH = 63;
export const DB_VARCHAR_DEF_LENGTH = 255;
export const DB_CODE_COLUMN_LENGTH = 36;
export const QUERY_FIND_MAX_PAGE_SIZE = 50;

export const ENTITY_USER_NAME = 'user';
export const ENTITY_GROUP_NAME = 'group';
export const ENTITY_CODE_FIELD_NAME = 'code';

/** @deprecated */
export const ENTITY_TYPE_STRING = 'string';
/** @deprecated */
export const ENTITY_TYPE_NUMBER = 'number';
/** @deprecated */
export const ENTITY_TYPE_BOOLEAN = 'boolean';
/** @deprecated */
export const ENTITY_TYPE_DATE = 'datetime';
