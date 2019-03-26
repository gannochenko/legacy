import { EntitySchema } from 'typeorm';
import { DB_SCHEMA_TABLE_NAME } from '../constants';

export default new EntitySchema({
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
    },
});
