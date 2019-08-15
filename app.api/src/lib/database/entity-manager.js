/**
 * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
 */

import md5 from 'md5';
import { EntitySchema } from 'typeorm';
import {
    DB_ENTITY_TABLE_PREFIX,
    DB_IDENTIFIER_LENGTH,
    DB_REF_TABLE_PREFIX,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    REFERENCE_ENTITY_PARENT_FIELD_NAME,
    REFERENCE_ENTITY_CHILD_FIELD_NAME,
} from 'project-minimum-core';

/**
 * This class creates database entities based on the schema
 */
export default class DatabaseEntityManager {
    /**
     * @param entity Schema entity (not database entity)
     * @param field
     */
    static getName(entity, field = null) {
        if (field && field.isReference() && field.isMultiple()) {
            return `${entity.getName()}_2_${field.getName()}`;
        }

        return entity.getName();
    }

    /**
     * @param entity Schema entity (not database entity)
     */
    static getTableName(entity) {
        return `${DB_ENTITY_TABLE_PREFIX}${entity.getName()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }

    /**
     * @param entity Schema entity (not database entity)
     * @param field
     */
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
        if (field.isReference()) {
            return field.isMultiple() ? null : 'integer';
        }

        if (field.getName() === ENTITY_ID_FIELD_NAME) {
            return 'uuid';
        }

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

    static getDBFieldGenerationStrategy(field) {
        const name = field.getName();

        if (name === ENTITY_ID_FIELD_NAME) {
            return 'uuid';
        }

        if (name === ENTITY_PK_FIELD_NAME) {
            return 'increment';
        }

        return null;
    }

    /**
     * Accepts a schema entity and returns a DDL structure of the table to create
     */
    static getDDLByEntity(entity) {
        const table = {
            name: this.getTableName(entity),
            columns: [],
        };

        // add "system" field: id
        table.columns.push({
            isNullable: false,
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            isArray: false,
            length: '',
            zerofill: false,
            unsigned: true,
            name: ENTITY_PK_FIELD_NAME,
            type: 'integer',
            generated: 'increment',
        });

        entity.getFields().forEach(field => {
            if (field.isReference() && field.isMultiple()) {
                // we do not create any fields for many-to-may relation. Instead, a table should be created
                return;
            }

            let columnMeta = {
                isNullable: !field.isRequired(),
                isGenerated: false,
                isPrimary: false,
                isUnique: field.isUnique(),
                isArray: field.isMultiple(),
                length: field.getLength(),
                zerofill: false,
                unsigned: false,
                name: field.getName(),
                type: this.getDBType(field),
            };

            const generationStrategy = this.getDBFieldGenerationStrategy(field);
            if (generationStrategy) {
                columnMeta = {
                    ...columnMeta,
                    isGenerated: true,
                    generationStrategy,
                };
            }

            table.columns.push(columnMeta);
        });

        return table;
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
            [ENTITY_PK_FIELD_NAME]: {
                primary: true,
                type: 'integer',
                generated: 'increment',
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
                type: this.constructor.getDBType(field),
                nullable: !field.isRequired(),
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
                    [REFERENCE_ENTITY_PARENT_FIELD_NAME]: {
                        type: 'integer',
                        nullable: false,
                        primary: true,
                    },
                    [REFERENCE_ENTITY_CHILD_FIELD_NAME]: {
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
