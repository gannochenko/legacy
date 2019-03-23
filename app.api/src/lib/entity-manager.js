import { EntitySchema } from 'typeorm';
import {
    DB_CODE_COLUMN_LENGTH,
    DB_IDENTIFIER_LENGTH,
    DB_TABLE_PREFIX,
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
        const result = {};
        (await this._schemaProvider.get()).forEach(entity => {
            result[entity.name] = this.getForEntity(entity);
            // todo: plus there should be all reference entities
        });
        return result;
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
        const sp = this._schemaProvider;
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
                sp.isMultipleField(field) &&
                _.isne(sp.getReferenceFieldName(field))
            ) {
                // we do not create any fields for many-to-may relation
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

        return new EntitySchema({
            name: this.getTableName(entity),
            columns,
        });
    }

    getTableName(entity) {
        return `${DB_TABLE_PREFIX}${entity.name.toLowerCase()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }
}
