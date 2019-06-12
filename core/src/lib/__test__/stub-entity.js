import {
    TYPE_BOOLEAN,
    TYPE_DATETIME,
    TYPE_INTEGER,
    TYPE_STRING,
} from '../field-types';
import { Entity } from '../schema/entity';

const makeStubEntity = () => {
    return new Entity({
        name: 'all_fields',
        schema: [
            {
                name: 'string_field',
                type: TYPE_STRING,
            },
            {
                name: 'string_field_m',
                type: [TYPE_STRING],
            },
            {
                name: 'integer_field',
                type: TYPE_INTEGER,
            },
            {
                name: 'integer_field_m',
                type: [TYPE_INTEGER],
            },
            {
                name: 'boolean_field',
                type: TYPE_BOOLEAN,
            },
            {
                name: 'boolean_field_m',
                type: [TYPE_BOOLEAN],
            },
            {
                name: 'date_field',
                type: TYPE_DATETIME,
            },
            {
                name: 'date_field_m',
                type: [TYPE_DATETIME],
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
