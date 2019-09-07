import { uCFirst } from '@bucket-of-bolts/util';
import * as yup from 'yup';
import _ from '@bucket-of-bolts/microdash';
import { ENTITY_PK_FIELD_NAME } from '../../constants.both';

export class BaseField {
    public constructor(declaration = {}) {
        this.declaration = declaration;
    }

    public async getHealth() {
        const errors = [];

        const name = this.getName();
        const type = this.getType();
        const isMultiple = this.isMultiple();
        const isUnique = this.isUnique();

        // check that entity has a name
        if (!_.isStringNotEmpty(name)) {
            errors.push({
                message: 'Field does not have a name',
                code: 'field_name_empty',
                fieldName: '',
            });
        }

        // check that entity has a type
        if (!_.isStringNotEmpty(type)) {
            errors.push({
                message: 'Field does not have a type',
                code: 'field_type_empty',
                fieldName: name || '',
            });
        }

        if (isMultiple && isUnique) {
            errors.push({
                message: 'The field can not be both multiple and unique',
                code: 'field_multiple_unique_conflict',
                fieldName: name || '',
            });
        }

        if (name === ENTITY_PK_FIELD_NAME) {
            errors.push({
                message: `The following name is system-reserved: ${name}`,
                code: 'field_name_illegal',
                fieldName: name,
            });
        }

        return errors;
    }

    public set declaration(declaration) {
        this.declarationInternal = this.getSanitizedDeclaration(declaration);
    }

    public get declaration() {
        return this.declarationInternal;
    }

    protected getSanitizedDeclaration(declaration) {
        const legal = [
            'type.ts',
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

        const validator = this.getDeclarationValidator();

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
            !_.isStringNotEmpty(type) &&
            !(
                _.isArray(type) &&
                type.length === 1 &&
                _.isStringNotEmpty(type[0])
            )
        ) {
            delete safeDeclaration.type;
        }

        return safeDeclaration;
    }

    protected getDeclarationValidator() {
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

    public getType() {
        return this.declaration.type || null;
    }

    public getActualType() {
        const type = this.getType();
        if (!type) {
            return null;
        }

        return this.isMultiple() ? type[0] : type;
    }

    public getLength() {
        return null;
    }

    /**
     * Returns field name, in snake_case
     */
    public getName() {
        return this.declaration.name;
    }

    /**
     * Returns field name in Readable format with spaces
     */
    public getDisplayName() {
        return _.isStringNotEmpty(this.declaration.label)
            ? this.declaration.label
            : uCFirst(this.getName()).replace(/_/g, ' ');
    }

    public getDeclaration() {
        return this.declaration;
    }

    public isMultiple() {
        return _.isArray(this.declaration.type);
    }

    public isSortable() {
        return !(this.isMultiple() || this.isReference());
    }

    public isRequired() {
        return this.declaration.required === true;
    }

    public isPreview() {
        return this.declaration.preview === true;
    }

    public isUnique() {
        return this.declaration.unique === true;
    }

    public isSystem() {
        return this.declaration.system === true;
    }

    public toJSON() {
        return this.declaration;
    }

    public castValue(value) {
        if (this.isMultiple()) {
            if (_.isArray(value)) {
                // cast & remove all nulls, does not make sense to keep them
                return value
                    .map(subValue => this.castValueItem(subValue))
                    .filter(x => x !== null && x !== undefined);
            }

            return value;
        }

        return this.castValueItem(value);
    }

    protected castValueItem(value) {
        return value;
    }

    protected getValidator() {
        let rule = this.createValueItemValidator();

        // multiple
        if (this.isMultiple()) {
            rule = yup.array().of(rule);
        }

        // required
        if (this.isRequired()) {
            rule = rule.required(`${this.getDisplayName()} is required`);
        } else {
            rule = rule.nullable();
        }

        return rule;
    }

    protected createValueItemValidator() {
        throw new Error('Not implemented');
    }

    protected getReferencedEntityName() {
        return null;
    }

    public isReference() {
        return false;
    }

    protected getTypeErrorMessage(what) {
        return `The value of '${this.getDisplayName()}' is not ${what}`;
    }
}
