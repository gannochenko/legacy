import {
    FIELD_TYPE_BOOLEAN,
    FIELD_TYPE_DATETIME,
    FIELD_TYPE_INTEGER,
    FIELD_TYPE_STRING,
} from '../schema/field/type';
import { Entity } from '../schema/entity';

const makeStubEntity = () => {
    return new Entity({
        name: 'all_fields',
        schema: [
            {
                name: 'string_field',
                type: FIELD_TYPE_STRING,
            },
            {
                name: 'string_field_m',
                type: [FIELD_TYPE_STRING],
            },
            {
                name: 'integer_field',
                type: FIELD_TYPE_INTEGER,
            },
            {
                name: 'integer_field_m',
                type: [FIELD_TYPE_INTEGER],
            },
            {
                name: 'boolean_field',
                type: FIELD_TYPE_BOOLEAN,
            },
            {
                name: 'boolean_field_m',
                type: [FIELD_TYPE_BOOLEAN],
            },
            {
                name: 'date_field',
                type: FIELD_TYPE_DATETIME,
            },
            {
                name: 'date_field_m',
                type: [FIELD_TYPE_DATETIME],
            },
            {
                name: 'reference_field',
                type: 'referenced_entity',
            },
            {
                name: 'reference_field_m',
                type: ['referenced_entity'],
            },
        ],
    });
};

export default makeStubEntity;
