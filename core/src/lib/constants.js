// todo: break this onto "client" and "server" constants

export const DB_TABLE_PREFIX = 'eq_';
export const DB_REF_TABLE_PREFIX = `${DB_TABLE_PREFIX}ref_`;
export const DB_ENTITY_TABLE_PREFIX = `${DB_TABLE_PREFIX}e_`;
export const DB_MIGRATION_TABLE_NAME = `${DB_TABLE_PREFIX}migrations`;
export const DB_SCHEMA_TABLE_NAME = `${DB_TABLE_PREFIX}schema`;
export const DB_IDENTIFIER_LENGTH = 63;
export const DB_VARCHAR_DEF_LENGTH = 255;
export const DB_CODE_COLUMN_LENGTH = 36;
export const QUERY_FIND_MAX_PAGE_SIZE = 50;

export const ENTITY_CODE_FIELD_NAME = 'code';
export const ENTITY_ID_FIELD_NAME = 'id';

export const REFERENCE_ENTITY_PARENT_FIELD_NAME = 'self';
export const REFERENCE_ENTITY_CHILD_FIELD_NAME = 'rel';
