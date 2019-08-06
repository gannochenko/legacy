import { BaseField } from './base';

export class NumericField extends BaseField {
    castValue(value) {
        return parseInt(value, 10);
    }
}
