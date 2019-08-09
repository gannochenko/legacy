import { Schema } from '../schema';
import { ENTITY_ID_FIELD_NAME } from '../../constants.both';

describe('Schema', () => {
    describe('getHealth()', () => {
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
                code: `entity_no_${ENTITY_ID_FIELD_NAME}_field`,
                entityName: 'entity_two',
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_type_empty',
                entityName: 'entity_two',
                fieldName: 'no_type',
            });
        });
    });

    describe('toJSON()', () => {
        it('should stringify to json', () => {
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
});
