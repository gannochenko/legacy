import md5 from 'md5';
import { EntitySchema } from 'typeorm';
import {
    DB_ENTITY_TABLE_PREFIX,
    DB_IDENTIFIER_LENGTH,
    DB_REF_TABLE_PREFIX,
    DB_CODE_COLUMN_LENGTH,
} from 'project-minimum-core';

/**
 * This class manages database entities on the basis of a schema provided
 */
export default class EntityManager {
    static getName(entity, field = null) {
        if (field && field.isReference() && field.isMultiple()) {
            return `${entity.getName()}_2_${field.getName()}`;
        }

        return entity.getName();
    }

    static getTableName(entity) {
        return `${DB_ENTITY_TABLE_PREFIX}${entity.getName()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }

    static getReferenceTableName(entity, field) {
        return `${DB_REF_TABLE_PREFIX}${md5(
            `${entity.getName()}_${field.getName()}`,
        )}`;
    }

    /**
     * Get database type by schema type
     * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
     * @param field
     * @returns {string}
     */
    static getDBType(field) {
        const type = field.getActualType();

        switch (type) {
            case 'string':
                return 'varchar';
            case 'integer':
                return 'integer';
            case 'datetime':
                return 'timestamp';
            case 'boolean':
                return 'boolean';
            default:
                return 'string';
        }
    }

    constructor(schema) {
        this.schema = schema;
    }

    /**
     * Get all database entities by their schema definition
     */
    get() {
        if (!this.entityList) {
            let result = {};
            this.schema.getSchema().forEach(entity => {
                result = { ...result, ...this.getForEntity(entity) };
            });
            this.entityList = result;
        }

        return this.entityList;
    }

    getByName(name) {
        const all = this.get();
        return all[name];
    }

    getByDefinition(entity, field = null) {
        return this.getByName(this.constructor.getName(entity, field));
    }

    /**
     * @private
     * @param entity
     * @returns {EntitySchema}
     */
    getForEntity(entity) {
        const result = {};

        // get the entity itself
        const columns = {
            id: {
                primary: true,
                type: 'integer',
                generated: 'increment',
                nullable: false,
            },
            code: {
                type: 'varchar',
                length: DB_CODE_COLUMN_LENGTH,
                nullable: false,
            },
        };
        const references = [];
        entity.getFields().forEach(field => {
            if (field.isReference() && field.isMultiple()) {
                // collect multiple references, don't create fields for it
                references.push(field);
                return;
            }

            const column = {
                type: field.isReference()
                    ? 'integer'
                    : this.constructor.getDBType(field),
                nullable: !field.isMandatory(),
                array: field.isMultiple(),
            };

            const length = field.getLength();
            if (length !== null) {
                column.length = length;
            }

            columns[field.getName()] = column;
        });

        result[this.constructor.getName(entity)] = new EntitySchema({
            name: this.constructor.getTableName(entity),
            columns,
        });

        // we do not create any fields for many-to-may relation, but make another entity
        references.forEach(field => {
            result[this.constructor.getName(entity, field)] = new EntitySchema({
                name: this.constructor.getReferenceTableName(entity, field),
                columns: {
                    self: {
                        type: 'integer',
                        nullable: false,
                        primary: true,
                    },
                    rel: {
                        type: 'integer',
                        nullable: false,
                        primary: true,
                    },
                },
            });
        });

        return result;
    }
}
