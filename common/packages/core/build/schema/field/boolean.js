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
class BooleanField extends base_1.BaseField {
    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }
        return !!value;
    }
    createValueItemValidator() {
        return yup.boolean().typeError(this.getTypeErrorMessage('a boolean'));
    }
}
exports.BooleanField = BooleanField;
//# sourceMappingURL=boolean.js.map
