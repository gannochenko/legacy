import { EntitySchema } from 'typeorm';
import md5 from 'md5';
import {
    DB_CODE_COLUMN_LENGTH,
    DB_IDENTIFIER_LENGTH,
    DB_TABLE_PREFIX,
    DB_REF_TABLE_PREFIX,
} from '../constants';

export default class EntityManager {
    constructor(schemaProvider) {
        this._schemaProvider = schemaProvider;
    }

    /**
     * Get database entities by their schema definition
     * @returns {Promise<void>}
     */
    async get() {
        if (!this._list) {
            const result = {};
            (await this._schemaProvider.get()).forEach(entity => {
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
        const sp = this._schemaProvider;

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
            name: this.getTableName(entity),
            columns,
        });

        // now create reference entities
        references.forEach(field => {
            result[this.getRefName(entity, field)] = new EntitySchema({
                name: this.getRefTableName(entity, field),
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

    getTableName(entity) {
        return `${DB_TABLE_PREFIX}${entity.name.toLowerCase()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }

    getRefName(entity, field) {
        return `${entity.name}_2_${field.name}`;
    }

    getRefTableName(entity, field) {
        return `${DB_REF_TABLE_PREFIX}${md5(`${entity.name}_${field.name}`)}`;
    }
}
