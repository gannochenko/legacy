import { Schema } from '../schema';

describe('Schema', () => {
    it('should report invalid health check', async () => {
        const schema = new Schema({
            schema: [
                {
                    name: 'entity_one',
                },
                {
                    name: 'entity_two',
                    schema: [
                        {
                            name: 'code',
                            type: 'string',
                            required: true,
                            unique: true,
                            length: 255,
                        },
                        {
                            name: 'no_type',
                        },
                    ],
                },
            ],
        });

        const errors = await schema.getHealth();
        expect(errors).toMatchObjectInArray({
            code: 'entity_schema_empty',
            entityName: 'entity_one',
        });
        expect(errors).toMatchObjectInArray({
            code: 'entity_code_field_missing',
            entityName: 'entity_one',
        });
        expect(errors).toMatchObjectInArray({
            code: 'field_type_illegal',
            entityName: 'entity_two',
            fieldName: 'no_type',
        });
    });

    it('should convert to json', () => {
        const schema = new Schema({
            schema: [
                {
                    name: 'entity_one',
                },
                {
                    name: 'entity_two',
                    schema: [
                        {
                            name: 'code',
                            type: 'string',
                            required: true,
                            unique: true,
                            length: 255,
                        },
                    ],
                },
            ],
        });

        const json = JSON.stringify(schema);
        const parsed = JSON.parse(json);
        expect(parsed).toMatchObject({
            schema: [
                { name: 'entity_one', schema: [] },
                {
                    name: 'entity_two',
                    schema: [
                        {
                            name: 'code',
                            type: 'string',
                            length: 255,
                            required: true,
                            unique: true,
                        },
                    ],
                },
            ],
            version: 0,
        });
    });
});
