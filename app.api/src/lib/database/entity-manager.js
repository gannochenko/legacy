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
    static getTableName(entity) {
        return `${DB_ENTITY_TABLE_PREFIX}${entity.getName()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }

    static getRefName(entity, field) {
        return `${entity.getName()}_2_${field.getName()}`;
    }

    static getRefTableName(entity, field) {
        return `${DB_REF_TABLE_PREFIX}${md5(
            `${entity.getName()}_${field.getName()}`,
        )}`;
    }

    constructor(schema) {
        this.schema = schema;
    }

    /**
     * Get all database entities by their schema definition
     * @returns {Promise<void>}
     */
    async get() {
        if (!this.entityList) {
            let result = {};
            (await this.schema.getSchema()).forEach(entity => {
                result = { ...result, ...this.getForEntity(entity) };
            });
            this.entityList = result;
        }

        return this.entityList;
    }

    async getByName(name) {
        const all = await this.get();
        return all[name];
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
                type: field.isReference() ? 'integer' : this.getDBType(field),
                nullable: !field.isMandatory(),
                array: field.isMultiple(),
            };

            const length = field.getLength();
            if (length !== null) {
                column.length = length;
            }

            columns[field.getName()] = column;
        });

        result[entity.getName()] = new EntitySchema({
            name: this.constructor.getTableName(entity),
            columns,
        });

        // we do not create any fields for many-to-may relation, but make another entity
        references.forEach(field => {
            result[
                this.constructor.getRefName(entity, field)
            ] = new EntitySchema({
                name: this.constructor.getRefTableName(entity, field),
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

    /**
     * Get database type by schema type
     * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
     * @param field
     * @returns {string}
     */
    getDBType(field) {
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
}
