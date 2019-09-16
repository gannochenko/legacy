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
Object.defineProperty(exports, '__esModule', { value: true });
const yup = __importStar(require('yup'));
const base_1 = require('./base');
const constants_server_1 = require('../../constants.server');
class StringField extends base_1.BaseField {
    getLength() {
        let { length } = this.declaration;
        if (length !== undefined) {
            if (typeof length !== 'number') {
                length = parseInt(length, 10);
                if (Number.isNaN(length)) {
                    return constants_server_1.DB_VARCHAR_DEF_LENGTH;
                }
            } else {
                return length;
            }
        }
        return null;
    }
    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }
        return value.toString();
    }
    createValueItemValidator() {
        return yup.string().typeError(this.getTypeErrorMessage('a string'));
    }
}
exports.StringField = StringField;
//# sourceMappingURL=string.js.map
