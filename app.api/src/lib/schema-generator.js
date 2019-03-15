/**
 * https://typeorm.io/#/separating-entity-definition
 */

import { EntitySchema } from 'typeorm';
import {
    DB_CODE_COLUMN_LENGTH,
    DB_VARCHAR_DEF_LENGTH,
    DB_IDENTIFIER_LENGTH,
    DB_TABLE_PREFIX,
} from '../constants';

export default class SchemaGenerator {
    static make(entity) {
        const columns = {
            id: {
                primary: true,
                type: 'int',
                generated: 'increment',
                nullable: false,
            },
            code: {
                type: String,
                length: DB_CODE_COLUMN_LENGTH,
                nullable: false,
            },
        };
        entity.schema.forEach(field => {
            const column = {
                type: field.type,
                length: 300,
                nullable: field.required !== true,
            };

            const length = this.getLength(field);
            if (length !== null) {
                column.length = length;
            }

            columns[field.name] = column;
        });

        return new EntitySchema({
            name: this.getTableName(entity),
            columns,
        });
    }

    static getLength(field) {
        if (field.type === String) {
            const length = parseInt(field.length, 10);
            if (isNaN(length)) {
                return DB_VARCHAR_DEF_LENGTH;
            }

            return length;
        }

        return null;
    }

    static getTableName(entity) {
        return `${DB_TABLE_PREFIX}${entity.name.toLowerCase()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }
}
