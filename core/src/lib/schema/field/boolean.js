import { BaseField } from './base';

export class BooleanField extends BaseField {
    castValue(value) {
        return !!value;
    }
}
