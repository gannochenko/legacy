export default class EntityProvider {
    async get() {
        return [
            {
                name: 'Person',
                schema: [
                    {
                        name: 'full_name',
                        type: String,
                        label: 'Full name',
                        required: true,
                        validate: () => {},
                    },
                    {
                        name: 'medals',
                        type: Number,
                        label: 'Medals',
                        default: 0,
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
                        type: 'reference',
                        entity: 'Pet',
                        multiple: true,
                        label: 'Pets',
                        validate: () => {},
                    },
                ],
            },
            {
                name: 'Pet',
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
