'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function(resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function(v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
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
var util_1 = require('@bucket-of-bolts/util');
var yup = __importStar(require('yup'));
var microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
var constants_both_1 = require('../../constants.both');
var field_type_1 = require('./field-type');
var BaseField = (function() {
    function BaseField(declaration) {
        this.fieldValidator = null;
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }
    Object.defineProperty(BaseField.prototype, 'declaration', {
        get: function() {
            return this.declarationInternal;
        },
        set: function(declaration) {
            this.declarationInternal = declaration;
        },
        enumerable: true,
        configurable: true,
    });
    BaseField.prototype.getType = function() {
        return this.declaration.type || null;
    };
    BaseField.prototype.getHealth = function() {
        return __awaiter(this, void 0, void 0, function() {
            var errors, name, type, isMultiple, isUnique;
            return __generator(this, function(_a) {
                errors = [];
                name = this.getName();
                type = this.getType();
                isMultiple = this.isMultiple();
                isUnique = this.isUnique();
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
                        message:
                            'The field can not be both multiple and unique',
                        code: 'field_multiple_unique_conflict',
                        fieldName: name || '',
                    });
                }
                if (name === constants_both_1.ENTITY_PK_FIELD_NAME) {
                    errors.push({
                        message:
                            'The following name is system-reserved: ' + name,
                        code: 'field_name_illegal',
                        fieldName: name,
                    });
                }
                return [2, errors];
            });
        });
    };
    BaseField.prototype.getActualType = function() {
        var type = this.getType();
        if (!type) {
            return null;
        }
        return this.isMultiple() ? type[0] : type;
    };
    BaseField.prototype.getLength = function() {
        return null;
    };
    BaseField.prototype.getName = function() {
        return this.declaration.name;
    };
    BaseField.prototype.getDisplayName = function() {
        return microdash_1.default.isStringNotEmpty(this.declaration.label)
            ? this.declaration.label
            : util_1.uCFirst(this.getName() || '').replace(/_/g, ' ');
    };
    BaseField.prototype.getDeclaration = function() {
        return this.declaration;
    };
    BaseField.prototype.isMultiple = function() {
        return microdash_1.default.isArray(this.declaration.type);
    };
    BaseField.prototype.isSortable = function() {
        return !(this.isMultiple() || this.isReference());
    };
    BaseField.prototype.isRequired = function() {
        return this.declaration.required === true;
    };
    BaseField.prototype.isPreview = function() {
        return this.declaration.preview === true;
    };
    BaseField.prototype.isUnique = function() {
        return this.declaration.unique === true;
    };
    BaseField.prototype.isSystem = function() {
        return this.declaration.system === true;
    };
    BaseField.prototype.toJSON = function() {
        return this.declaration;
    };
    BaseField.prototype.castValue = function(value) {
        var _this = this;
        if (this.isMultiple()) {
            if (microdash_1.default.isArray(value)) {
                return value
                    .map(function(subValue) {
                        return _this.castValueItem(subValue);
                    })
                    .filter(function(x) {
                        return x !== null && x !== undefined;
                    });
            }
            return value;
        }
        return this.castValueItem(value);
    };
    BaseField.prototype.getReferencedEntityName = function() {
        return null;
    };
    BaseField.prototype.isReference = function() {
        return false;
    };
    BaseField.prototype.getSafeDeclaration = function(declaration) {
        var legal = [
            'type',
            'name',
            'label',
            'length',
            'required',
            'unique',
            'preview',
            'system',
        ];
        var safeDeclaration = {
            name: '',
            type: field_type_1.FIELD_TYPE_STRING,
        };
        Object.keys(declaration).forEach(function(key) {
            if (legal.includes(key)) {
                safeDeclaration[key] = declaration[key];
            }
        });
        var validator = this.getDeclarationValidator();
        try {
            validator.validateSync(declaration, {
                abortEarly: false,
            });
        } catch (validationErrors) {
            if (validationErrors instanceof yup.ValidationError) {
                validationErrors.inner.forEach(function(errorItem) {
                    delete safeDeclaration[errorItem.path];
                });
            } else {
                throw validationErrors;
            }
        }
        var type = safeDeclaration.type;
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
    };
    BaseField.prototype.getDeclarationValidator = function() {
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
    };
    BaseField.prototype.castValueItem = function(value) {
        return value;
    };
    BaseField.prototype.getValidator = function() {
        var rule = this.createValueItemValidator();
        if (this.isMultiple()) {
            rule = yup.array().of(rule);
        }
        if (this.isRequired()) {
            rule = rule.required(this.getDisplayName() + ' is required');
        } else {
            rule = rule.nullable();
        }
        return rule;
    };
    BaseField.prototype.createValueItemValidator = function() {
        throw new Error('Not implemented');
    };
    BaseField.prototype.getTypeErrorMessage = function(what) {
        return "The value of '" + this.getDisplayName() + "' is not " + what;
    };
    return BaseField;
})();
exports.BaseField = BaseField;
//# sourceMappingURL=base.js.map
