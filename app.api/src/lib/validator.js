import {
    ENTITY_TYPE_STRING,
    ENTITY_TYPE_NUMBER,
    ENTITY_TYPE_BOOLEAN,
    ENTITY_TYPE_DATE,
} from '../constants';

import moment from 'moment';

export default class Validator {
    /**
     * todo: different locales
     * todo: use yup here
     * @param entity
     * @param data
     * @returns {Promise<Array>}
     */
    static async validate(entity, data) {
        const errors = [];

        entity.schema.forEach(field => {
            const value = data[field.name];
            const name = field.name;
            const type = field.type;
            const label = _.isne(field.label) ? field.label : name;
            if (typeof value !== 'undefined' && value !== null) {
                // check length
                if (type === ENTITY_TYPE_STRING) {
                    const length = parseInt(field.length, 10);
                    if (!isNaN(length)) {
                        if (value.length > length) {
                            errors.push({
                                code: 'too_long',
                                message: `Field "${label}" is longer than ${length} characters`,
                                subject: name,
                            });
                        }
                    }
                } else if (false) {
                    // todo: check for array length
                }

                // todo: check regexp

                // check date value
                if (type === ENTITY_TYPE_DATE) {
                    // todo: also support timestamp
                    if (!moment(value, moment.ISO_8601, true).isValid()) {
                        errors.push({
                            code: 'invalid_date',
                            message: `Field "${label}" contains an invalid date`,
                            subject: name,
                        });
                    }
                }

                // todo: check custom validation
            } else {
                if (field.required) {
                    errors.push({
                        code: 'required',
                        message: `Field "${label}" is required`,
                        subject: name,
                    });
                }
            }
        });

        return errors;
    }
}
