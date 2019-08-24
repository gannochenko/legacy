/**
 * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
 */

// @ts-ignore
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
    // @ts-ignore
} from 'project-minimum-core';
import { Entity, Field, Schema } from '../project-minimum-core';

/**
 * This class creates database entities based on the schema
 */
export default class DatabaseEntityManager {
    /**
     * @param entity Schema entity (not database entity)
     * @param field
     */
    public static getName(entity: Entity, field: Nullable<Field> = null) {
        if (field && field.isReference() && field.isMultiple()) {
            return `${entity.getName()}_2_${field.getName()}`;
        }

        return entity.getName();
    }

    /**
     * @param entity Schema entity (not database entity)
     */
    public static getTableName(entity: Entity) {
        return `${DB_ENTITY_TABLE_PREFIX}${entity.getName()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }

    /**
     * @param entity Schema entity (not database entity)
     * @param field
     */
    public static getReferenceTableName(entity: Entity, field: Field) {
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
    public static getDBType(field: Field) {
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

    public static getDBFieldGenerationStrategy(field: Field) {
        const name = field.getName();

        if (name === ENTITY_ID_FIELD_NAME) {
            return 'uuid';
        }

        if (name === ENTITY_PK_FIELD_NAME) {
            return 'increment';
        }

        return null;
    }

    public static getDBFieldLength(field: Field) {
        const length = field.getLength();
        // length is not supported by uuid field
        if (length && field.getName() !== ENTITY_ID_FIELD_NAME) {
            return length;
        }

        return undefined;
    }

    /**
     * Accepts a schema entity and returns a DDL structure of the table to create
     */
    public static getDDLByEntity(entity: Entity) {
        const table = {
            name: this.getTableName(entity),
            columns: [] as StringMap[],
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

            let columnMeta: StringMap = {
                isNullable: !field.isRequired(),
                isGenerated: false,
                isPrimary: false,
                isUnique: field.isUnique(),
                isArray: field.isMultiple(),
                length: this.getDBFieldLength(field),
                zerofill: false,
                unsigned: false,
                name: field.getName(),
                type: this.getDBType(field),
            };

            const generated = this.getDBFieldGenerationStrategy(field);
            if (generated) {
                columnMeta = {
                    ...columnMeta,
                    isGenerated: true,
                    generated,
                };
            }

            table.columns.push(columnMeta);
        });

        return table;
    }

    private readonly schema: Schema;
    private entityList: StringMap = {};

    public constructor(schema: Schema) {
        this.schema = schema;
    }

    /**
     * Get all database entities by their schema definition
     */
    public get() {
        if (!this.entityList) {
            let result: StringMap = {};
            this.schema.getSchema().forEach(entity => {
                result = { ...result, ...this.getForEntity(entity) };
            });
            this.entityList = result;
        }

        return this.entityList;
    }

    public getByName(name: string) {
        const all = this.get();
        return all[name];
    }

    public getByDefinition(entity: Entity, field: Nullable<Field> = null) {
        return this.getByName(DatabaseEntityManager.getName(entity, field));
    }

    private getForEntity(entity: Entity) {
        const result: StringMap = {};

        // get the entity itself
        const columns: StringMap = {
            [ENTITY_PK_FIELD_NAME]: {
                primary: true,
                type: 'integer',
                generated: 'increment',
                nullable: false,
            },
        };
        const references: Field[] = [];
        entity.getFields().forEach(field => {
            if (field.isReference() && field.isMultiple()) {
                // collect multiple references, don't create fields for it
                references.push(field);
                return;
            }

            columns[field.getName()] = {
                type: DatabaseEntityManager.getDBType(field),
                nullable: !field.isRequired(),
                array: field.isMultiple(),
                length: DatabaseEntityManager.getDBFieldLength(field),
            };
        });

        result[DatabaseEntityManager.getName(entity)] = new EntitySchema({
            name: DatabaseEntityManager.getTableName(entity),
            columns,
        });

        // we do not create any fields for many-to-may relation, but make another entity
        references.forEach(field => {
            result[
                DatabaseEntityManager.getName(entity, field)
            ] = new EntitySchema({
                name: DatabaseEntityManager.getReferenceTableName(
                    entity,
                    field,
                ),
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
