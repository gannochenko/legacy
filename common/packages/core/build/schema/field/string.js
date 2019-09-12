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
var constants_server_1 = require("../../constants.server");
var StringField = (function (_super) {
    __extends(StringField, _super);
    function StringField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringField.prototype.getLength = function () {
        var length = this.declaration.length;
        if (length !== undefined) {
            if (typeof length !== 'number') {
                length = parseInt(length, 10);
                if (Number.isNaN(length)) {
                    return constants_server_1.DB_VARCHAR_DEF_LENGTH;
                }
            }
            else {
                return length;
            }
        }
        return null;
    };
    StringField.prototype.castValueItem = function (value) {
        if (value === undefined || value === null) {
            return null;
        }
        return value.toString();
    };
    StringField.prototype.createValueItemValidator = function () {
        return yup.string().typeError(this.getTypeErrorMessage('a string'));
    };
    return StringField;
}(base_1.BaseField));
exports.StringField = StringField;
//# sourceMappingURL=string.js.map