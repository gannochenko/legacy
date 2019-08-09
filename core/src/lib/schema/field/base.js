/* eslint import/no-unresolved: 0 */
import { uCFirst } from 'ew-internals';
import * as yup from 'yup';
import { ENTITY_PK_FIELD_NAME } from '../../constants.both';
import _ from '../../lodash';

export class BaseField {
    constructor(declaration = {}) {
        this.declaration = declaration;
    }

    async getHealth() {
        const errors = [];

        const name = this.getName();
        const type = this.getType();

        // check that entity has a name
        if (!_.isne(name)) {
            errors.push({
                message: 'Field does not have a name',
                code: 'field_name_empty',
                fieldName: '',
            });
        }

        // check that entity has a type
        if (!_.isne(type)) {
            errors.push({
                message: 'Field does not have a type',
                code: 'field_type_empty',
                fieldName: name || '',
            });
        }

        if (name === ENTITY_PK_FIELD_NAME) {
            errors.push({
                message: `The following name is system-reserved: ${name}`,
                code: `field_name_illegal`,
                fieldName: name,
            });
        }

        return errors;
    }

    set declaration(declaration) {
        this.declarationInternal = this.getSanitizedDeclaration(declaration);
    }

    get declaration() {
        return this.declarationInternal;
    }

    getSanitizedDeclaration(declaration) {
        const legal = [
            'type',
            'name',
            'label',
            'length',
            'required',
            'unique',
            'preview',
            'system',
        ];

        const safeDeclaration = {};
        Object.keys(declaration).forEach(key => {
            if (legal.includes(key)) {
                safeDeclaration[key] = declaration[key];
            }
        });

        const validator = this.getValidator();

        try {
            validator.validateSync(declaration, {
                abortEarly: false,
            });
        } catch (validationErrors) {
            if (validationErrors instanceof yup.ValidationError) {
                validationErrors.inner.forEach(errorItem => {
                    delete safeDeclaration[errorItem.path];
                });
            } else {
                throw validationErrors;
            }
        }

        const { type } = safeDeclaration;

        // check if type is string or [string] (not possible to do with yup?)
        if (
            !_.isne(type) &&
            !(_.isArray(type) && type.length === 1 && _.isne(type[0]))
        ) {
            delete safeDeclaration.type;
        }

        return safeDeclaration;
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
                system: yup
                    .boolean()
                    .typeError('System flag should be boolean'),
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

    getDeclaration() {
        return this.declaration;
    }

    isMultiple() {
        return _.isArray(this.declaration.type);
    }

    isSortable() {
        return !(this.isMultiple() || this.isReference());
    }

    isRequired() {
        return this.declaration.required === true;
    }

    isPreview() {
        return this.declaration.preview === true;
    }

    isUnique() {
        return this.declaration.unique === true;
    }

    isSystem() {
        return this.declaration.system === true;
    }

    toJSON() {
        return this.declaration;
    }

    castValue(value) {
        if (this.isMultiple()) {
            if (_.isArray(value)) {
                // cast & remove all nulls, does not make sense to keep them
                return value
                    .map(subValue => this.castValueItem(subValue))
                    .filter(x => x !== null);
            }

            return value;
        }

        return this.castValueItem(value);
    }

    castValueItem(value) {
        return value;
    }

    createValueItemValidator() {}

    getReferencedEntityName() {
        return null;
    }

    isReference() {
        return false;
    }

    getTypeErrorMessage(what) {
        return `The value of '${this.getDisplayName()}' is not ${what}`;
    }
}
