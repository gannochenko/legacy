/* eslint import/no-unresolved: 0 */

import { uCFirst } from 'ew-internals';
import * as yup from 'yup';
import { DB_VARCHAR_DEF_LENGTH } from '../constants.server';
import {
    TYPE_STRING,
    TYPE_BOOLEAN,
    TYPE_DATETIME,
    TYPE_INTEGER,
} from '../field-types';
import _ from '../lodash';

export class Field {
    constructor(declaration = {}) {
        this.declaration = this.sanitizeDeclarationKeys(declaration);
    }

    async checkHealth() {
        const errors = [];
        const { declaration } = this;
        const { type } = declaration;

        const validator = this.getValidator();

        try {
            await validator.validate(declaration, {
                abortEarly: false,
            });
        } catch (validationErrors) {
            if (validationErrors instanceof yup.ValidationError) {
                validationErrors.inner.forEach(errorItem => {
                    errors.push({
                        message: errorItem.message,
                        code: `field_illegal`,
                        fieldName: errorItem.path,
                    });
                });
            } else {
                throw validationErrors;
            }
        }

        // check if type is string or [string]
        if (
            !_.isne(type) &&
            !(_.isArray(type) && type.length === 1 && _.isne(type[0]))
        ) {
            errors.push({
                message:
                    'Field type should be of type string or an array of one string',
                code: `field_type_illegal`,
                fieldName: declaration.name || '',
            });
        }

        return errors;
    }

    getValidator() {
        if (!this.fieldValidator) {
            this.fieldValidator = yup.object().shape({
                name: yup
                    .string()
                    .typeError('Field name should be a string')
                    .strict(true)
                    .required('Field should have a name'),
                // // it is impossible in yup to write like this =(((
                // type: yup.mixed().oneOf([
                //     yup.string(),
                //     yup.array().of(yup.string()).min(1).max(1),
                // ], 'Field type should be of type string or an array of one string'),
                label: yup
                    .string()
                    .typeError('Field label should be a string')
                    .strict(true),
                length: yup
                    .number()
                    .typeError('Field length should be a number'),
                required: yup
                    .boolean()
                    .typeError('Field required flag should be boolean'),
                unique: yup
                    .boolean()
                    .typeError('Field unique flag should be boolean'),
                preview: yup
                    .boolean()
                    .typeError('Field preview flag should be boolean'),
            });
        }

        return this.fieldValidator;
    }

    getType() {
        return this.declaration.type || null;
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
            const length = parseInt(this.declaration.length, 10);
            if (Number.isNaN(length)) {
                return DB_VARCHAR_DEF_LENGTH;
            }

            return length;
        }

        return null;
    }

    /**
     * Returns field name, in snake_case
     * @returns {*|string}
     */
    getName() {
        return this.declaration.name;
    }

    /**
     * Returns field name in Readable format with spaces
     * @returns {*}
     */
    getDisplayName() {
        return _.isne(this.declaration.label)
            ? this.declaration.label
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

    getDeclaration() {
        return this.declaration;
    }

    isMultiple() {
        return _.isArray(this.declaration.type);
    }

    isReference() {
        return _.isne(this.getReferencedEntityName());
    }

    isSortable() {
        return !this.isMultiple() && !this.isReference();
    }

    isMandatory() {
        return this.declaration.required === true;
    }

    isPreview() {
        return this.declaration.preview === true;
    }

    isUnique() {
        return this.declaration.unique === true;
    }

    toJSON() {
        return this.declaration;
    }

    sanitizeDeclarationKeys(declaration) {
        const legal = this.getLegalKeys();
        const result = {};
        Object.keys(declaration).forEach(key => {
            if (legal.includes(key)) {
                result[key] = declaration[key];
            }
        });

        return result;
    }

    getLegalKeys() {
        return [
            'type',
            'name',
            'label',
            'length',
            'required',
            'unique',
            'preview',
        ];
    }
}
