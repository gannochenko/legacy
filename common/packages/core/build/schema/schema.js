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
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
var microdash_1 = __importDefault(require('@bucket-of-bolts/microdash'));
var entity_1 = require('./entity');
var Schema = (function() {
    function Schema(declaration) {
        this.declarationInternal = this.getSafeDeclaration(declaration);
    }
    Object.defineProperty(Schema.prototype, 'declaration', {
        get: function() {
            return this.declarationInternal;
        },
        set: function(declaration) {
            this.declarationInternal = declaration;
        },
        enumerable: true,
        configurable: true,
    });
    Schema.prototype.getHealth = function() {
        return __awaiter(this, void 0, void 0, function() {
            var errors, schema, times;
            var _this = this;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        errors = [];
                        schema = this.getSchema();
                        if (!schema.length) {
                            return [2, errors];
                        }
                        times = {};
                        schema.forEach(function(entity) {
                            times[entity.getName()] =
                                entity.getName() in times
                                    ? times[entity.getName()] + 1
                                    : 1;
                        });
                        Object.keys(times).forEach(function(key) {
                            if (times[key] > 1) {
                                errors.push({
                                    message:
                                        'Entity "' +
                                        key +
                                        '" met several times',
                                    code: 'entity_duplicate',
                                    entityName: key,
                                });
                            }
                        });
                        return [
                            4,
                            Promise.all(
                                schema.map(function(entity) {
                                    return entity
                                        .getHealth()
                                        .then(function(entityErrors) {
                                            entityErrors.forEach(function(
                                                entityError,
                                            ) {
                                                errors.push(
                                                    Object.assign(
                                                        {},
                                                        entityError,
                                                    ),
                                                );
                                            });
                                        });
                                }),
                            ),
                        ];
                    case 1:
                        _a.sent();
                        this.getReferences().forEach(function(field) {
                            var referenceName = field.getReferencedEntityName();
                            if (
                                !(typeof referenceName === 'string') ||
                                !_this.getEntity(referenceName)
                            ) {
                                errors.push({
                                    message:
                                        'Entity "' +
                                        referenceName +
                                        '" is referenced, but not created',
                                    code: 'field_broken_reference',
                                    fieldName: referenceName || '',
                                });
                            }
                        });
                        return [2, errors];
                }
            });
        });
    };
    Schema.prototype.getSafeDeclaration = function(declaration) {
        var safeDeclaration = {
            version: 0,
            schema: [],
        };
        if (typeof declaration.version === 'string') {
            var safeVersion = parseInt(declaration.version, 10);
            if (!Number.isNaN(safeVersion)) {
                safeDeclaration.version = safeVersion;
            }
        } else if (typeof declaration.version === 'number') {
            safeDeclaration.version = declaration.version;
        }
        if (declaration.schema) {
            safeDeclaration.schema = declaration.schema.map(function(entity) {
                return new entity_1.Entity(entity);
            });
        }
        return safeDeclaration;
    };
    Schema.prototype.toJSON = function() {
        return this.declarationInternal;
    };
    Schema.prototype.getSchema = function() {
        return this.declaration.schema;
    };
    Schema.prototype.getVersion = function() {
        return this.declaration.version;
    };
    Schema.prototype.getEntity = function(name) {
        return this.declaration.schema.find(function(entity) {
            return entity.getName() === name;
        });
    };
    Schema.prototype.getReferences = function() {
        var refs = [];
        this.declaration.schema.forEach(function(entity) {
            refs = microdash_1.default.union(refs, entity.getReferences());
        });
        return refs;
    };
    Schema.prototype.isEmpty = function() {
        return !this.declaration.schema.length;
    };
    return Schema;
})();
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map
