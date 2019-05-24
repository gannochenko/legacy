/* eslint import/no-unresolved: 0 */

import { uCFirst } from 'ew-internals';
import * as yup from 'yup';
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
        this.schema = {
            ...declaration.name,
            ...declaration.type,
            ...declaration.label,
            ...declaration.length,
            ...declaration.required,
            ...declaration.unique,
            ...declaration.preview,
        };
    }

    checkHealth() {
        const errors = [];
        const { schema } = this;
        const { name, type, label, length, required, unique, preview } = schema;

        // use yup here...

        // check that field has name
        if (!_.isne(name)) {
            errors.push({
                message: 'Field does not have a name',
                code: 'field_name_empty',
                reference: null,
            });
        }

        if (!_.isne(type) && !(_.iane(type) && _.isne(type[0]))) {
            errors.push({
                message:
                    'Type should be a string or an array of one string element',
                code: 'field_type_illegal',
                reference: schema.name,
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

    getFieldValidator() {
        if (!this.fieldValidator) {
            this.fieldValidator = {
                name: yup
                    .string('Field name should be a string')
                    .required('Field should have a name'),
                type: yup.shape().required('Field should have a type'),
                label: yup.oneOf(),
                length: yup.number(),
                required: yup.boolean(),
                unique: yup.boolean(),
                preview: yup.boolean(),
            };
        }

        return this.fieldValidator;
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
