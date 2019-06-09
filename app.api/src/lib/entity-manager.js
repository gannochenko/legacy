import { EntitySchema } from 'typeorm';
import { DB_CODE_COLUMN_LENGTH } from '../constants';
import { getRefName, getRefTableName, getTableName } from './entity-util';

/**
 * @deprecated
 */
export default class EntityManager {
    constructor(schemaProvider) {
        this.schemaProvider = schemaProvider;
    }

    /**
     * Get database entities by their schema definition
     * @returns {Promise<void>}
     */
    async get() {
        if (!this._list) {
            const result = {};
            (await this.schemaProvider.get()).forEach(entity => {
                this.getForEntity(entity, result);
            });
            this._list = result;
        }

        return this._list;
    }

    async getByName(name) {
        const all = await this.get();
        return all[name];
    }

    /**
     * @private
     * @param entity
     * @param result
     * @returns {EntitySchema}
     */
    getForEntity(entity, result) {
        const sp = this.schemaProvider;

        // get the entity itself
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
        const references = [];
        entity.schema.forEach(field => {
            if (
                sp.isMultipleField(field) &&
                _.isne(sp.getReferenceFieldName(field))
            ) {
                // we do not create any fields for many-to-may relation, but make another entity
                references.push(field);
                return;
            }

            const column = {
                type: sp.getFieldType(field),
                nullable: field.required !== true,
                array: _.isArray(field.type),
            };

            const length = sp.getFieldLength(field);
            if (length !== null) {
                column.length = length;
            }

            columns[field.name] = column;
        });

        result[entity.name] = new EntitySchema({
            name: getTableName(entity),
            columns,
        });

        // now create reference entities
        references.forEach(field => {
            result[getRefName(entity, field)] = new EntitySchema({
                name: getRefTableName(entity, field),
                columns: {
                    self: {
                        type: Number,
                        nullable: false,
                        primary: true,
                    },
                    rel: {
                        type: Number,
                        nullable: false,
                        primary: true,
                    },
                },
            });
        });
    }
}
