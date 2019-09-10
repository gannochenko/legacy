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
var BooleanField = (function(_super) {
    __extends(BooleanField, _super);
    function BooleanField() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    BooleanField.prototype.castValueItem = function(value) {
        if (value === undefined || value === null) {
            return null;
        }
        return !!value;
    };
    BooleanField.prototype.createValueItemValidator = function() {
        return yup.boolean().typeError(this.getTypeErrorMessage('a boolean'));
    };
    return BooleanField;
})(base_1.BaseField);
exports.BooleanField = BooleanField;
//# sourceMappingURL=boolean.js.map
