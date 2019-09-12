"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yup = __importStar(require("yup"));
var base_1 = require("./base");
var IntegerField = (function (_super) {
    __extends(IntegerField, _super);
    function IntegerField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegerField.prototype.castValueItem = function (value) {
        if (value === undefined || value === null) {
            return null;
        }
        var castedValue = parseInt(value, 10);
        if (!Number.isNaN(castedValue)) {
            return castedValue;
        }
        return value;
    };
    IntegerField.prototype.createValueItemValidator = function () {
        return yup
            .number()
            .integer()
            .typeError(this.getTypeErrorMessage('an integer'));
    };
    return IntegerField;
}(base_1.BaseField));
exports.IntegerField = IntegerField;
//# sourceMappingURL=integer.js.map