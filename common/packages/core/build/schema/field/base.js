'use strict';
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result['default'] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const util_1 = require('@bucket-of-bolts/util');
const yup = __importStar(require('yup'));
const microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
const constants_both_1 = require('../../constants.both');
class BaseField {
    constructor(declaration = {}) {
        this.fieldValidator = null;
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }
    set declaration(declaration) {
        this.declarationInternal = declaration;
    }
    get declaration() {
        return this.declarationInternal;
    }
    getType() {
        return this.declaration.type;
    }
    async getHealth() {
        const errors = [];
        const name = this.getName();
        const type = this.getType();
        const isMultiple = this.isMultiple();
        const isUnique = this.isUnique();
        if (!microdash_1.default.isStringNotEmpty(name)) {
            errors.push({
                message: 'Field does not have a name',
                code: 'field_name_empty',
                fieldName: '',
            });
        }
        if (!microdash_1.default.isStringNotEmpty(type)) {
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
        if (name === constants_both_1.ENTITY_PK_FIELD_NAME) {
            errors.push({
                message: `The following name is system-reserved: ${name}`,
                code: 'field_name_illegal',
                fieldName: name,
            });
        }
        return errors;
    }
    getActualType() {
        const type = this.getType();
        return Array.isArray(type) ? type[0] : type;
    }
    getLength() {
        return null;
    }
    getName() {
        return this.declaration.name;
    }
    getDisplayName() {
        const { label } = this.declaration;
        if (label) {
            return label;
        }
        return util_1.uCFirst(this.getName() || '').replace(/_/g, ' ');
    }
    getDeclaration() {
        return this.declaration;
    }
    isMultiple() {
        return microdash_1.default.isArray(this.declaration.type);
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
            if (microdash_1.default.isArray(value)) {
                return value
                    .map(subValue => this.castValueItem(subValue))
                    .filter(x => x !== null && x !== undefined);
            }
            return value;
        }
        return this.castValueItem(value);
    }
    getReferencedEntityName() {
        return '';
    }
    isReference() {
        return false;
    }
    getSafeDeclaration(declaration = {}) {
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
        const safeDeclaration = {
            name: '',
            type: '',
        };
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
        if (
            !microdash_1.default.isStringNotEmpty(type) &&
            !(
                microdash_1.default.isArray(type) &&
                type.length === 1 &&
                microdash_1.default.isStringNotEmpty(type[0])
            )
        ) {
            delete safeDeclaration.type;
        }
        return safeDeclaration;
    }
    getDeclarationValidator() {
        if (!this.fieldValidator) {
            this.fieldValidator = yup.object().shape({
                name: yup
                    .string()
                    .typeError('Field name should be a string')
                    .strict(true)
                    .required('Field should have a name'),
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
    castValueItem(value) {
        return value;
    }
    getValidator() {
        let rule = this.createValueItemValidator();
        if (this.isMultiple()) {
            rule = yup.array().of(rule);
        }
        if (this.isRequired()) {
            rule = rule.required(`${this.getDisplayName()} is required`);
        } else {
            rule = rule.nullable();
        }
        return rule;
    }
    createValueItemValidator() {
        throw new Error('Not implemented');
    }
    getTypeErrorMessage(what) {
        return `The value of '${this.getDisplayName()}' is not ${what}`;
    }
}
exports.BaseField = BaseField;
//# sourceMappingURL=base.js.map
