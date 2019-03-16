import { ENTITY_TYPE_REFERENCE } from '../constants';

export default class EntityProvider {
    async get() {
        return [
            {
                name: 'important_person',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: String,
                        label: 'Code',
                        length: 36,
                        required: true,
                        inputRequired: false,
                        unique: true,
                        validate: () => {},
                    },
                    {
                        name: 'full_name',
                        type: String,
                        label: 'Full name',
                        required: true,
                        validate: () => {},
                    },
                    {
                        name: 'tags',
                        type: [String],
                        label: 'Tags',
                        required: false,
                        validate: () => {},
                    },
                    {
                        name: 'lucky_numbers',
                        type: [Number],
                        label: 'Lucky numbers',
                        validate: () => {},
                    },
                    {
                        name: 'birth_date',
                        type: Date,
                        label: 'Birth date',
                        validate: () => {},
                    },
                    {
                        name: 'has_pets',
                        type: Boolean,
                        label: 'Has pets',
                        validate: () => {},
                    },
                    {
                        name: 'pets',
                        type: [ENTITY_TYPE_REFERENCE],
                        entity: 'Pet',
                        label: 'Pets',
                        validate: () => {},
                    },
                ],
            },
            {
                name: 'pet',
                schema: [
                    {
                        // a system field
                        name: 'code',
                        type: String,
                        label: 'Code',
                        length: 36,
                        required: true,
                        inputRequired: false,
                        unique: true,
                        validate: () => {},
                    },
                    {
                        name: 'nickname',
                        type: String,
                        label: 'Nickname',
                        required: true,
                        validate: () => {},
                    },
                ],
            },
        ];
    }
}
