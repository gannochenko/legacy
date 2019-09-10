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
var field_type_1 = require('./field/field-type');
var constants_both_1 = require('../constants.both');
var make_field_1 = require('./field/make-field');
var Entity = (function() {
    function Entity(declaration) {
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }
    Object.defineProperty(Entity.prototype, 'declaration', {
        get: function() {
            return this.declarationInternal;
        },
        set: function(structure) {
            this.declarationInternal = structure;
        },
        enumerable: true,
        configurable: true,
    });
    Entity.prototype.getSafeDeclaration = function(declaration) {
        var safeDeclaration = { name: '', schema: [] };
        if (typeof declaration.name === 'string') {
            safeDeclaration.name = declaration.name;
        }
        if (
            declaration.schema &&
            microdash_1.default.isArrayNotEmpty(declaration.schema)
        ) {
            safeDeclaration.schema = declaration.schema.map(function(field) {
                return make_field_1.makeField(field);
            });
        }
        return safeDeclaration;
    };
    Entity.prototype.getHealth = function() {
        return __awaiter(this, void 0, void 0, function() {
            var errors, declaration, times;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        declaration = this.declaration;
                        if (!declaration.name.length) {
                            errors.push({
                                message: 'Entity does not have a name',
                                code: 'entity_name_empty',
                                entityName: '',
                            });
                        }
                        if (!declaration.schema.length) {
                            errors.push({
                                message: 'Entity does not have a single field',
                                code: 'entity_schema_empty',
                                entityName: declaration.name || '',
                            });
                            return [2, errors];
                        }
                        times = {};
                        declaration.schema.forEach(function(field) {
                            times[field.getName()] =
                                field.getName() in times
                                    ? times[field.getName()] + 1
                                    : 1;
                        });
                        Object.keys(times).forEach(function(key) {
                            if (times[key] > 1) {
                                errors.push({
                                    message:
                                        'Field "' + key + '" met several times',
                                    code: 'entity_field_duplicate',
                                    fieldName: key,
                                    entityName: declaration.name || '',
                                });
                            }
                        });
                        if (!times[constants_both_1.ENTITY_ID_FIELD_NAME]) {
                            errors.push({
                                message: 'Entity does not have id field',
                                code: 'entity_no_id_field',
                                entityName: declaration.name || '',
                            });
                        }
                        return [
                            4,
                            Promise.all(
                                declaration.schema.map(function(field) {
                                    return field
                                        .getHealth()
                                        .then(function(fieldErrors) {
                                            fieldErrors.forEach(function(
                                                fieldError,
                                            ) {
                                                errors.push(
                                                    Object.assign(
                                                        {},
                                                        fieldError,
                                                        {
                                                            entityName:
                                                                declaration.name,
                                                        },
                                                    ),
                                                );
                                            });
                                        });
                                }),
                            ),
                        ];
                    case 1:
                        _a.sent();
                        return [2, errors];
                }
            });
        });
    };
    Entity.prototype.getName = function() {
        return this.declaration.name;
    };
    Entity.prototype.getCamelName = function() {
        return util_1.convertToCamel(this.getName().toLowerCase());
    };
    Entity.prototype.getDisplayName = function() {
        return util_1.uCFirst(this.getName()).replace(/_/g, ' ');
    };
    Entity.prototype.getFields = function() {
        return this.declaration.schema;
    };
    Entity.prototype.getReferences = function() {
        return this.getFields().filter(function(field) {
            return field.isReference();
        });
    };
    Entity.prototype.getSingleReferences = function() {
        return this.getFields().filter(function(field) {
            return field.isReference() && !field.isMultiple();
        });
    };
    Entity.prototype.getMultipleReferences = function() {
        return this.getFields().filter(function(field) {
            return field.isReference() && field.isMultiple();
        });
    };
    Entity.prototype.getField = function(name) {
        return this.declaration.schema.find(function(field) {
            return field.getName() === name;
        });
    };
    Entity.prototype.toJSON = function() {
        return this.declaration;
    };
    Entity.prototype.getPreviewField = function() {
        var preview = this.declaration.schema.find(function(field) {
            return (
                field.getType() === field_type_1.FIELD_TYPE_STRING &&
                field.getName() !== constants_both_1.ENTITY_ID_FIELD_NAME &&
                field.isPreview()
            );
        });
        if (preview) {
            return preview;
        }
        return (
            this.declaration.schema.find(function(field) {
                return (
                    field.getType() === field_type_1.FIELD_TYPE_STRING &&
                    field.getName() !== constants_both_1.ENTITY_ID_FIELD_NAME
                );
            }) || null
        );
    };
    Entity.prototype.getValidator = function() {
        var shape = {};
        this.declaration.schema.forEach(function(field) {
            shape[field.getName()] = field.getValidator();
        });
        return yup.object().shape(shape);
    };
    Entity.prototype.castData = function(data) {
        var processed = {};
        if (!microdash_1.default.isObjectNotEmpty(data)) {
            return processed;
        }
        this.getFields().forEach(function(field) {
            var name = field.getName();
            if (!(name in data)) {
                return;
            }
            processed[name] = field.castValue(data[name]);
        });
        return processed;
    };
    Entity.prototype.validateData = function(sourceData) {
        return __awaiter(this, void 0, void 0, function() {
            var errors, validationErrors_1;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [
                            4,
                            this.getValidator().validate(sourceData, {
                                abortEarly: false,
                            }),
                        ];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        validationErrors_1 = _a.sent();
                        if (
                            microdash_1.default.isArray(
                                validationErrors_1.inner,
                            )
                        ) {
                            errors = validationErrors_1.inner.map(function(
                                error,
                            ) {
                                return {
                                    message: error.message,
                                    code: 'validation',
                                    fieldName: error.path,
                                };
                            });
                        } else {
                            errors = [
                                {
                                    message: 'Internal error',
                                    code: 'internal',
                                    fieldName: '',
                                },
                            ];
                        }
                        return [3, 4];
                    case 4:
                        return [2, errors];
                }
            });
        });
    };
    return Entity;
})();
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map
