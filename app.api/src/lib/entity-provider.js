export default class EntityProvider {
    async get() {
        return [
            {
                name: 'important_person',
                schema: [
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
                        type: ['reference'],
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
