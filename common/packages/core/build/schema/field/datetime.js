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
class DateTimeField extends base_1.BaseField {
    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }
        if (value instanceof Date) {
            return value.toISOString();
        }
        const timestamp = Date.parse(value);
        if (!Number.isNaN(timestamp)) {
            return new Date(timestamp).toISOString();
        }
        if (!Number.isNaN(parseInt(value, 10))) {
            return new Date(parseInt(value, 10)).toISOString();
        }
        return value;
    }
    createValueItemValidator() {
        return yup.date().typeError(this.getTypeErrorMessage('a date'));
    }
}
exports.DateTimeField = DateTimeField;
//# sourceMappingURL=datetime.js.map
