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

export default class EntitySchemaGenerator {
    static make({ entities }) {
        const result = {};
        entities.forEach(entity => {
            result[entity.name] = this.makeOne(entity);
        });
        return result;
    }

    static makeOne(entity) {
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
            if (
                this.isMultipleField(field) &&
                _.isne(this.getReferenceFieldName(field))
            ) {
                // we do not create any fields for many-to-may relation
                return;
            }

            const column = {
                type: this.getType(field),
                nullable: field.required !== true,
                array: _.isArray(field.type),
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

    static getType(field) {
        let type = field.type;

        if (_.isArray(type)) {
            type = type[0] || String;
        }

        if (_.isne(type)) {
            // reference
            type = Number;
        }

        return type;
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

    static getReferenceFieldName(field) {
        if (this.isMultipleField(field) && _.isne(field.type[0])) {
            return field.type[0];
        }

        return _.isne(field.type) ? field.type : null;
    }

    static isMultipleField(field) {
        return _.isArray(field.type);
    }
}
