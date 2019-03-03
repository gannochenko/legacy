import { wrapError } from '../lib/util';

export default (app, params = {}) => {
    const { cache } = params;
    app.get(
        '/conv',
        wrapError(async (req, res) => {
            const person = {
                name: 'Person',
                schema: [
                    {
                        name: 'code',
                        type: String,
                        label: 'Code',
                        required: true,
                        validate: (value, data) => {},
                    },
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
                        label: 'Pets',
                        validate: () => {},
                    },
                ],
            };

            const pet = {
                name: 'Pet',
                schema: [
                    {
                        name: 'code',
                        type: String,
                        label: 'Code',
                        required: true,
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
            };

            // convert schema to graphql

            res.status(200).send('Cache reset');
        }),
    );
};
