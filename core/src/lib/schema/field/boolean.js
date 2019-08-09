import * as yup from 'yup';
import { BaseField } from './base';

export class BooleanField extends BaseField {
    castValueItem(value) {
        return !!value;
    }

    createValueItemValidator() {
        return yup.boolean().typeError(this.getTypeErrorMessage('a boolean'));
    }
}
