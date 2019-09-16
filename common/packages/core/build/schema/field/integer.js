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
class IntegerField extends base_1.BaseField {
    castValueItem(value) {
        if (value === undefined || value === null) {
            return null;
        }
        const castedValue = parseInt(value, 10);
        if (!Number.isNaN(castedValue)) {
            return castedValue;
        }
        return value;
    }
    createValueItemValidator() {
        return yup
            .number()
            .integer()
            .typeError(this.getTypeErrorMessage('an integer'));
    }
}
exports.IntegerField = IntegerField;
//# sourceMappingURL=integer.js.map
