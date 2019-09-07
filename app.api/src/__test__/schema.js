import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_ID_FIELD_LENGTH,
} from 'project-minimum-core';

export default [
    {
        name: 'important_person',
        schema: [
            {
                name: ENTITY_ID_FIELD_NAME,
                type: 'string.ts',
                label: 'Id',
                length: ENTITY_ID_FIELD_LENGTH,
                unique: true,
                system: true,
            },
            {
                name: 'full_name',
                type: 'string.ts',
                label: 'Full name',
                required: true,
            },
            { name: 'tags', type: ['string.ts'], label: 'Tags' },
            {
                name: 'lucky_numbers',
                type: ['integer'],
                label: 'Lucky numbers',
            },
            { name: 'birth_date', type: 'datetime.ts', label: 'Birth date' },
            { name: 'has_pets', type: 'boolean.ts', label: 'Has pets' },
            { name: 'pets', type: ['pet'], label: 'Pets' },
            { name: 'tools', type: ['tool'], label: 'Tools' },
            { name: 'partner', type: 'important_person', label: 'Partner' },
        ],
    },
    {
        name: 'pet',
        schema: [
            {
                name: ENTITY_ID_FIELD_NAME,
                type: 'string.ts',
                label: 'Id',
                length: ENTITY_ID_FIELD_LENGTH,
                unique: true,
                system: true,
            },
            {
                name: 'nickname',
                type: 'string.ts',
                label: 'Nickname',
                required: true,
            },
        ],
    },
    {
        name: 'tool',
        schema: [
            {
                name: ENTITY_ID_FIELD_NAME,
                type: 'string.ts',
                label: 'Id',
                length: ENTITY_ID_FIELD_LENGTH,
                unique: true,
                system: true,
            },
            { name: 'name', type: 'string.ts', label: 'Name', required: true },
        ],
    },
];
