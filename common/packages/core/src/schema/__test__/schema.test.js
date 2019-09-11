import { Schema } from '../schema';
import { ENTITY_ID_FIELD_NAME } from '../../constants.both';
import { Entity } from '../entity';
import { ReferenceField } from '../field';

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

    describe('getSafeDeclaration()', () => {
        it('should return skeleton declaration', async () => {
            const schema = new Schema();
            const declaration = schema.declaration;

            expect(declaration).toEqual({ schema: [], version: 0 });
        });

        it('should normalize declaration', async () => {
            const schema = new Schema({
                schema: 'la',
                version: 'b',
            });
            const declaration = schema.declaration;

            expect(declaration).toEqual({ schema: [], version: 0 });
        });

        it('should make instances of entities', async () => {
            const schema = new Schema({
                schema: [
                    {
                        name: 'test',
                        schema: [
                            {
                                name: 'entity_1',
                                schema: [
                                    {
                                        name: 'field_1',
                                        type: 'boolean',
                                    },
                                ],
                            },
                        ],
                    },
                ],
                version: 10,
            });
            const declaration = schema.declaration;

            expect(declaration.schema[0]).toBeInstanceOf(Entity);
        });
    });

    describe('getSchema()', () => {
        it('should return valid schema', async () => {
            const schema = new Schema({
                schema: [
                    {
                        name: 'test',
                        schema: [
                            {
                                name: 'entity_1',
                                schema: [
                                    {
                                        name: 'field_1',
                                        type: 'boolean',
                                    },
                                ],
                            },
                        ],
                    },
                ],
                version: 10,
            });

            expect(schema.getSchema()).toHaveLength(1);
        });
    });

    describe('getVersion()', () => {
        it('should return schema version', async () => {
            const schema = new Schema({
                version: 5,
            });

            expect(schema.getVersion()).toEqual(5);
        });
    });

    describe('getEntity()', () => {
        it('should return entity by its name', async () => {
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

            const second = schema.getEntity('entity_two');

            expect(second).toBeInstanceOf(Entity);
            expect(second.getName()).toEqual('entity_two');
        });
    });

    describe('getReferences()', () => {
        it('should return references of all entities', async () => {
            const schema = new Schema({
                schema: [
                    {
                        name: 'entity_one',
                        schema: [
                            {
                                name: 'reference_1',
                                type: ['reference_1'],
                            },
                            {
                                name: 'string_1',
                                type: 'string',
                            },
                        ],
                    },
                    {
                        name: 'entity_two',
                        schema: [
                            {
                                name: 'reference_1',
                                type: 'reference_1',
                            },
                            {
                                name: 'number_1',
                                type: 'integer',
                            },
                        ],
                    },
                ],
            });

            const references = schema.getReferences();

            expect(references).toHaveLength(2);
            expect(references[0]).toBeInstanceOf(ReferenceField);
            expect(references[0].getName()).toEqual('reference_1');
            expect(references[1]).toBeInstanceOf(ReferenceField);
            expect(references[1].getName()).toEqual('reference_1');
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
