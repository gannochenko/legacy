import { Field } from './field';
import { TYPE_STRING } from '../field-types';

export class CodeField extends Field {
    checkHealth() {
        const errors = super.checkHealth();
        const { schema } = this;

        // // check that it is mandatory
        // if (!schema.required) {
        //     errors.push({
        //         message: 'System field "code" should be mandatory',
        //         code: 'field_code_not_mandatory',
        //         reference: schema.name,
        //     });
        // }

        // check that it is unique
        if (!schema.unique) {
            errors.push({
                message: 'System field "code" should be unique',
                code: 'field_code_not_unique',
                reference: schema.name,
            });
        }

        // check that it has type of string
        if (this.getActualType() !== TYPE_STRING) {
            errors.push({
                message: 'System field "code" should be of type string',
                code: 'field_code_not_string',
                reference: schema.name,
            });
        }

        // check that it is not multiple
        if (this.isMultiple()) {
            errors.push({
                message: 'System field "code" should not be multiple',
                code: 'field_code_multiple',
                reference: schema.name,
            });
        }

        // check that it is not multiple
        const len = parseInt(schema.length, 10);
        if (Number.isNaN(len) || len <= 0) {
            errors.push({
                message: 'System field "code" should have a finite length',
                code: 'field_code_illegal_length',
                reference: schema.name,
            });
        }

        return errors;
    }
}
