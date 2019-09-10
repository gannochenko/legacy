'use strict';
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
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
Object.defineProperty(exports, '__esModule', { value: true });
var yup = __importStar(require('yup'));
var string_1 = require('./string');
var constants_both_1 = require('../../constants.both');
var field_type_1 = require('./field-type');
var IdStringField = (function(_super) {
    __extends(IdStringField, _super);
    function IdStringField() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    IdStringField.prototype.getHealth = function() {
        return __awaiter(this, void 0, void 0, function() {
            var errors, name, system, unique, length;
            return __generator(this, function(_a) {
                switch (_a.label) {
                    case 0:
                        return [4, _super.prototype.getHealth.call(this)];
                    case 1:
                        errors = _a.sent();
                        name = this.getName();
                        system = this.isSystem();
                        unique = this.isUnique();
                        length = this.getLength();
                        if (!system) {
                            errors.push({
                                message:
                                    'The field should be declared as system-reserved: ' +
                                    name,
                                code: 'field_not_system',
                                fieldName: name,
                            });
                        }
                        if (!unique) {
                            errors.push({
                                message:
                                    'System field "' +
                                    constants_both_1.ENTITY_ID_FIELD_NAME +
                                    '" should be unique',
                                code: 'field_id_not_unique',
                                fieldName: name,
                            });
                        }
                        if (
                            this.getActualType() !==
                            field_type_1.FIELD_TYPE_STRING
                        ) {
                            errors.push({
                                message:
                                    'System field "' +
                                    constants_both_1.ENTITY_ID_FIELD_NAME +
                                    '" should be string',
                                code: 'field_id_not_string',
                                fieldName: name,
                            });
                        }
                        if (this.isMultiple()) {
                            errors.push({
                                message:
                                    'System field "' +
                                    constants_both_1.ENTITY_ID_FIELD_NAME +
                                    '" should not be multiple',
                                code: 'field_id_multiple',
                                fieldName: name,
                            });
                        }
                        if (
                            length !== null &&
                            length !== constants_both_1.ENTITY_ID_FIELD_LENGTH
                        ) {
                            errors.push({
                                message:
                                    'System field "' +
                                    constants_both_1.ENTITY_ID_FIELD_NAME +
                                    '" should have length of ' +
                                    constants_both_1.ENTITY_ID_FIELD_LENGTH,
                                code: 'field_id_illegal_length',
                                fieldName: name,
                            });
                        }
                        return [2, errors];
                }
            });
        });
    };
    IdStringField.prototype.createValueItemValidator = function() {
        return yup
            .string()
            .length(
                constants_both_1.ENTITY_ID_FIELD_LENGTH,
                "Field '" +
                    this.getDisplayName() +
                    "' should be " +
                    constants_both_1.ENTITY_ID_FIELD_LENGTH +
                    ' characters long',
            )
            .typeError(this.getTypeErrorMessage('a string'));
    };
    return IdStringField;
})(string_1.StringField);
exports.IdStringField = IdStringField;
//# sourceMappingURL=id-string.js.map
