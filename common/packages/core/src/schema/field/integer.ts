// @ts-ignore
import * as yup from 'yup';
import { BaseField } from './base';

export class IntegerField extends BaseField {
    protected castValueItem(value: any) {
        if (value === undefined || value === null) {
            return null;
        }

        const castedValue = parseInt(value, 10);
        if (!Number.isNaN(castedValue)) {
            return castedValue;
        }

        return value; // unable to cast
    }

    protected createValueItemValidator() {
        return yup
            .number()
            .integer()
            .typeError(this.getTypeErrorMessage('an integer'));
    }
}
