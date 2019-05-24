import { EntitySchema } from 'typeorm';
import { DB_SCHEMA_TABLE_NAME } from '../constants';

export const schema = {
    name: DB_SCHEMA_TABLE_NAME,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: 'increment',
            nullable: false,
        },
        draft: {
            type: 'boolean',
            nullable: false,
        },
        structure: {
            type: 'json',
            nullable: false,
        },
        version: {
            type: 'int',
            defaultValue: 0,
        },
    },
};
export default new EntitySchema(schema);
