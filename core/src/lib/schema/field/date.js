import { BaseField } from './base';

export class DateField extends BaseField {
    castValue(value) {
        if (value === undefined || value === null) {
            return null;
        }

        if (value instanceof Date) {
            // just a date
            return value.toISOString();
        }

        const timestamp = Date.parse(value);
        if (!Number.isNaN(timestamp)) {
            // a string representation of a date
            return new Date(timestamp).toISOString();
        }

        if (!Number.isNaN(parseInt(value, 10))) {
            // last chance - a timestamp
            return new Date(parseInt(value, 10)).toISOString();
        }

        return null;
    }
}
