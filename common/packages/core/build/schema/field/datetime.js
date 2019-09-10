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
var base_1 = require('./base');
var DateTimeField = (function(_super) {
    __extends(DateTimeField, _super);
    function DateTimeField() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    DateTimeField.prototype.castValueItem = function(value) {
        if (value === undefined || value === null) {
            return null;
        }
        if (value instanceof Date) {
            return value.toISOString();
        }
        var timestamp = Date.parse(value);
        if (!Number.isNaN(timestamp)) {
            return new Date(timestamp).toISOString();
        }
        if (!Number.isNaN(parseInt(value, 10))) {
            return new Date(parseInt(value, 10)).toISOString();
        }
        return value;
    };
    DateTimeField.prototype.createValueItemValidator = function() {
        return yup.date().typeError(this.getTypeErrorMessage('a date'));
    };
    return DateTimeField;
})(base_1.BaseField);
exports.DateTimeField = DateTimeField;
//# sourceMappingURL=datetime.js.map
