/* eslint import/no-unresolved: 0 */

import { uCFirst } from 'ew-internals';
import { DB_VARCHAR_DEF_LENGTH } from '../constants';
import {
    TYPE_STRING,
    TYPE_BOOLEAN,
    TYPE_DATETIME,
    TYPE_INTEGER,
} from '../field-types';
import _ from '../lodash';

export class Field {
    constructor(declaration) {
        if (!_.ione(declaration)) {
            declaration = {};
        }
        this.schema = declaration;
    }

    checkHealth() {
        const errors = [];
        const { schema } = this;

        // check that field has at least name and type
        if (!_.isne(schema.name)) {
            errors.push({
                message: 'Field does not have a name',
                code: 'field_name_empty',
                reference: null,
            });
        }

        if (!_.isne(this.getActualType())) {
            errors.push({
                message: 'Field does not have a type',
                code: 'field_type_empty',
                reference: schema.name,
            });
        }

        return errors;
    }

    getType() {
        return this.schema.type || null;
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
            const length = parseInt(this.schema.length, 10);
            if (Number.isNaN(length)) {
                return DB_VARCHAR_DEF_LENGTH;
            }

            return length;
        }

        return null;
    }

    getName() {
        return this.schema.name;
    }

    getDisplayName() {
        return _.isne(this.schema.label)
            ? this.schema.label
            : uCFirst(this.getName()).replace(/_/g, ' ');
    }

    getReferencedEntityName() {
        const type = this.getActualType();
        if (
            [TYPE_STRING, TYPE_BOOLEAN, TYPE_DATETIME, TYPE_INTEGER].indexOf(
                type,
            ) >= 0
        ) {
            return null;
        }

        return type;
    }

    /**
     * @deprecated
     * @returns {*}
     */
    getReferenceFieldName() {
        return this.getReferencedEntityName();
    }

    isMultiple() {
        return _.isArray(this.schema.type);
    }

    isReference() {
        return _.isne(this.getReferencedEntityName());
    }

    isSortable() {
        return !this.isMultiple() && !this.isReference();
    }

    isMandatory() {
        return this.schema.required === true;
    }

    isPreview() {
        return this.schema.preview === true;
    }

    toJSON() {
        return this.schema;
    }
}
