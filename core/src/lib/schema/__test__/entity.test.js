import { Entity } from '../entity';
import makeStubEntity from '../../__test__/stub-entity';
import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_ID_FIELD_LENGTH,
} from '../../constants.both';
import { ReferenceField, StringField } from '../field';

describe('Entity', () => {
    describe('getSanitizedDeclaration()', () => {
        it('should normalize declaration', async () => {
            const entity = new Entity();

            expect(entity.declaration).toMatchObject({ name: '', schema: [] });
        });
    });

    describe('getHealth()', () => {
        it('should report on empty entity', async () => {
            const entity = new Entity({
                schema: [],
            });

            const errors = await entity.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'entity_schema_empty',
            });
        });

        it('should report on nameless entity', async () => {
            const entity = new Entity({
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                ],
            });

            const errors = await entity.getHealth();

            expect(errors).toMatchObjectInArray({ code: 'entity_name_empty' });
            expect(errors).toMatchObjectInArray({
                code: 'entity_no_id_field',
            });
        });

        it('should report invalid fieldset health check', async () => {
            const name = 'test';
            const entity = new Entity({
                name,
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: '',
                        type: 'string',
                    },
                ],
            });

            const errors = await entity.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_name_empty',
                fieldName: '',
            });
            expect(errors).toMatchObjectInArray({
                code: 'entity_no_id_field',
            });
        });

        it(`should report invalid ${ENTITY_ID_FIELD_NAME} field health check`, async () => {
            const name = 'test';
            const entity = new Entity({
                name,
                schema: [
                    {
                        name: ENTITY_ID_FIELD_NAME,
                        type: 'boolean',
                        system: true,
                    },
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                ],
            });

            const errors = await entity.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_id_not_unique',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_id_not_string',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_id_illegal_length',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
        });

        it('should report on duplicate fields', async () => {
            const entity = new Entity({
                name: 'sample',
                schema: [
                    {
                        name: ENTITY_ID_FIELD_NAME,
                        type: 'string',
                        system: true,
                        unique: true,
                        length: ENTITY_ID_FIELD_LENGTH,
                    },
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: 'i_have_a_name',
                        type: 'string',
                    },
                ],
            });

            const errors = await entity.getHealth();
            expect(errors).toMatchObjectInArray({
                code: 'entity_field_duplicate',
                fieldName: 'i_have_a_name',
            });
        });
    });

    describe('castData() + validateData()', () => {
        it('should cast and validate input data: multiple <-> single', async () => {
            const main = makeStubEntity();
            const data = main.castData({
                string_field: ['A', 'B'],
                string_field_m: 'A',
            });

            expect(data).toMatchObject({
                string_field: 'A,B',
                string_field_m: 'A', // stays the same
            });

            const errors = await main.validateData(data);
            expect(errors).toEqual({
                data: { string_field_m: null, string_field: 'A,B' },
                errors: null,
            });
        });

        it('should cast and validate input data: string', async () => {
            const main = makeStubEntity();

            let data = main.castData({
                string_field: null,
                string_field_m: [null],
            });
            expect(data).toMatchObject({
                string_field: null,
                string_field_m: [],
            });
            let result = await main.validateData(data);
            expect(result).toEqual({
                data: { string_field: null, string_field_m: [] },
                errors: null,
            });

            data = main.castData({
                string_field: undefined,
                string_field_m: [undefined],
            });
            expect(data).toMatchObject({
                string_field: null,
                string_field_m: [],
            });
            result = await main.validateData(data);
            expect(result).toEqual({
                data: { string_field: null, string_field_m: [] },
                errors: null,
            });

            data = main.castData({
                string_field: 1000,
                string_field_m: [1000],
            });
            expect(data).toMatchObject({
                string_field: '1000',
                string_field_m: ['1000'],
            });
            result = await main.validateData(data);
            expect(result).toEqual({
                data: { string_field: '1000', string_field_m: ['1000'] },
                errors: null,
            });

            data = main.castData({
                string_field: new Date('2019-06-12T18:20:48.394Z'),
                string_field_m: [new Date('2019-06-12T18:20:48.394Z')],
            });
            expect(
                data.string_field.indexOf('Wed Jun 12 2019 20:20:48 GMT+0200'),
            ).toEqual(0);
            expect(
                data.string_field_m[0].indexOf(
                    'Wed Jun 12 2019 20:20:48 GMT+0200',
                ),
            ).toEqual(0);
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);
        });

        it('should cast and validate input data: boolean', async () => {
            const main = makeStubEntity();

            let data = main.castData({
                boolean_field: true,
                boolean_field_m: [false],
            });
            expect(data).toMatchObject({
                boolean_field: true,
                boolean_field_m: [false],
            });
            let result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                boolean_field: 0,
                boolean_field_m: [1],
            });
            expect(data).toMatchObject({
                boolean_field: false,
                boolean_field_m: [true],
            });
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                boolean_field: '0',
                boolean_field_m: ['1'],
            });
            expect(data).toMatchObject({
                boolean_field: true,
                boolean_field_m: [true],
            });
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);
        });

        it('should cast and validate input data: date', async () => {
            const main = makeStubEntity();

            let data = main.castData({
                date_field: new Date('2019-06-12T18:20:48.394Z'),
                date_field_m: [new Date('2019-06-12T18:20:48.394Z')],
            });
            expect(data).toMatchObject({
                date_field: '2019-06-12T18:20:48.394Z',
                date_field_m: ['2019-06-12T18:20:48.394Z'],
            });
            let result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                date_field: '2019-06-12T18:20:48.394Z',
                date_field_m: ['2019-06-12T18:20:48.394Z'],
            });
            expect(data).toMatchObject({
                date_field: '2019-06-12T18:20:48.394Z',
                date_field_m: ['2019-06-12T18:20:48.394Z'],
            });
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                date_field: '1560364245420',
                date_field_m: ['1560364245420'],
            });
            expect(data).toMatchObject({
                date_field: '2019-06-12T18:30:45.420Z',
                date_field_m: ['2019-06-12T18:30:45.420Z'],
            });
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                date_field: 'not_a_date',
                date_field_m: ['not_a_date'],
            });
            expect(data).toMatchObject({
                date_field: 'not_a_date',
                date_field_m: ['not_a_date'],
            });
            result = await main.validateData(data);
            expect(result.errors).toEqual([
                {
                    field: 'date_field_m[0]',
                    message: "Field 'Date field m' is not a date",
                },
                {
                    field: 'date_field',
                    message: "Field 'Date field' is not a date",
                },
            ]);
        });

        it('should cast and validate input data: references', async () => {
            const main = makeStubEntity();

            let data = main.castData({
                reference_field: '4ef6f520-d180-4aee-9517-43214f396609',
                reference_field_m: ['4ef6f520-d180-4aee-9517-43214f396609'],
            });
            expect(data).toMatchObject({
                reference_field: '4ef6f520-d180-4aee-9517-43214f396609',
                reference_field_m: ['4ef6f520-d180-4aee-9517-43214f396609'],
            });
            let result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                reference_field: undefined,
                reference_field_m: [null],
            });
            expect(data).toMatchObject({
                reference_field: null,
                reference_field_m: [],
            });
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);

            data = main.castData({
                reference_field_m: [
                    null,
                    undefined,
                    '4ef6f520-d180-4aee-9517-43214f396609',
                    new Date('2019-06-12T18:30:45.420Z'),
                ],
            });

            expect(data.reference_field_m[0]).toEqual(
                '4ef6f520-d180-4aee-9517-43214f396609',
            );
            expect(
                data.reference_field_m[1].indexOf(
                    'Wed Jun 12 2019 20:30:45 GMT+0200',
                ),
            ).toEqual(0);
            result = await main.validateData(data);
            expect(result.errors).toEqual(null);
        });
    });

    describe('getName()', () => {
        it('should return correct snake case name', async () => {
            const entity = new Entity({
                name: 'my_name_is_alice',
                schema: [],
            });

            expect(entity.getName()).toEqual('my_name_is_alice');
        });
    });

    describe('getCamelName()', () => {
        it('should return correct camel case name', async () => {
            const entity = new Entity({
                name: 'my_name_is_alice',
                schema: [],
            });

            expect(entity.getCamelName()).toEqual('MyNameIsAlice');
        });
    });

    describe('getDisplayName()', () => {
        it('should return correct space-separated name', async () => {
            const entity = new Entity({
                name: 'my_name_is_alice',
                schema: [],
            });

            expect(entity.getDisplayName()).toEqual('My name is alice');
        });
    });

    describe('getReferences()', () => {
        it('should return references', async () => {
            const entity = new Entity({
                name: 'sample',
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: 'single_ref',
                        type: 'referenced_entity_1',
                    },
                    {
                        name: 'multiple_ref',
                        type: ['referenced_entity_2'],
                    },
                ],
            });

            const result = entity.getReferences();
            expect(result).toHaveLength(2);

            expect(result[0]).toBeInstanceOf(ReferenceField);
            expect(result[0].getName()).toEqual('single_ref');

            expect(result[1]).toBeInstanceOf(ReferenceField);
            expect(result[1].getName()).toEqual('multiple_ref');
        });
    });

    describe('getSingleReferences()', () => {
        it('should return references', async () => {
            const entity = new Entity({
                name: 'sample',
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: 'single_ref',
                        type: 'referenced_entity_1',
                    },
                    {
                        name: 'multiple_ref',
                        type: ['referenced_entity_2'],
                    },
                ],
            });

            const result = entity.getSingleReferences();
            expect(result).toHaveLength(1);

            expect(result[0]).toBeInstanceOf(ReferenceField);
            expect(result[0].getName()).toEqual('single_ref');
        });
    });

    describe('getMultipleReferences()', () => {
        it('should return references', async () => {
            const entity = new Entity({
                name: 'sample',
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: 'single_ref',
                        type: 'referenced_entity_1',
                    },
                    {
                        name: 'multiple_ref',
                        type: ['referenced_entity_2'],
                    },
                ],
            });

            const result = entity.getMultipleReferences();
            expect(result).toHaveLength(1);

            expect(result[0]).toBeInstanceOf(ReferenceField);
            expect(result[0].getName()).toEqual('multiple_ref');
        });
    });

    describe('getPreviewField()', () => {
        it('should take first single string field as presentational', async () => {
            const entity = new Entity({
                name: 'sample',
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: 'single_ref',
                        type: 'referenced_entity_1',
                    },
                    {
                        name: 'i_am_presentational',
                        type: 'string',
                    },
                ],
            });

            const result = entity.getPreviewField();

            expect(result).toBeInstanceOf(StringField);
            expect(result.getName()).toEqual('i_am_presentational');
        });

        it('should take specified field as presentational', async () => {
            const entity = new Entity({
                name: 'sample',
                schema: [
                    {
                        name: 'i_have_a_name',
                        type: 'boolean',
                    },
                    {
                        name: 'single_ref',
                        type: 'referenced_entity_1',
                    },
                    {
                        name: 'i_am_not_presentational',
                        type: 'string',
                    },
                    {
                        name: 'i_am_presentational',
                        type: 'string',
                        preview: true,
                    },
                ],
            });

            const result = entity.getPreviewField();

            expect(result).toBeInstanceOf(StringField);
            expect(result.getName()).toEqual('i_am_presentational');
        });
    });
});
