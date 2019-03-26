import { DB_VARCHAR_DEF_LENGTH } from '../../constants';

export const TYPE_STRING = 'string';
export const TYPE_INTEGER = 'integer';
export const TYPE_BOOLEAN = 'boolean';
export const TYPE_DATETIME = 'datetime';

export default class Field {
    constructor(declaration) {
        this._schema = declaration;
    }

    checkHealth() {
        const errors = [];
        const schema = this._schema;

        // check that field has at least name and type
        if (!_.isne(schema.name)) {
            errors.push({
                message: 'Field does not have a name',
                code: 'field_name_empty',
                reference: null,
            });
        }

        if (!_.isne(schema.type)) {
            errors.push({
                message: 'Field does not have a type',
                code: 'field_type_empty',
                reference: schema.name,
            });
        }

        return errors;
    }

    isMultiple() {
        return _.isArray(this._schema.type);
    }

    getType() {
        return this._schema.type || null;
    }

    getActualType() {
        const type = this.getType();
        if (!type) {
            return null;
        }

        return this.isMultiple() ? type[0] : type;
    }

    getLength() {
        const type = this.getType();
        if (type === TYPE_STRING) {
            const length = parseInt(this._schema.length, 10);
            if (isNaN(length)) {
                return DB_VARCHAR_DEF_LENGTH;
            }

            return length;
        }

        return null;
    }

    // todo: tmp
    getReferenceFieldName() {
        this.getActualType();
    }

    toJSON() {
        return this._schema;
    }
}
