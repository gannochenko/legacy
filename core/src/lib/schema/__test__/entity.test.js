import { Entity } from '../entity';
import makeStubEntity from '../../__test__/stub-entity';
import { ENTITY_ID_FIELD_NAME } from '../../constants.both';
// import { FIELD_TYPE_STRING, FIELD_TYPE_BOOLEAN, FIELD_TYPE_DATETIME, FIELD_TYPE_INTEGER } from '../../field-types';

describe('Entity', () => {
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
    });

    it('should cast and validate input data: multiple <-> single', async () => {
        const main = makeStubEntity();
        const data = main.prepareData({
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

        let data = main.prepareData({
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

        data = main.prepareData({
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

        data = main.prepareData({
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

        data = main.prepareData({
            string_field: new Date('2019-06-12T18:20:48.394Z'),
            string_field_m: [new Date('2019-06-12T18:20:48.394Z')],
        });
        expect(
            data.string_field.indexOf('Wed Jun 12 2019 20:20:48 GMT+0200'),
        ).toEqual(0);
        expect(
            data.string_field_m[0].indexOf('Wed Jun 12 2019 20:20:48 GMT+0200'),
        ).toEqual(0);
        result = await main.validateData(data);
        expect(result.errors).toEqual(null);
    });

    it('should cast and validate input data: boolean', async () => {
        const main = makeStubEntity();

        let data = main.prepareData({
            boolean_field: true,
            boolean_field_m: [false],
        });
        expect(data).toMatchObject({
            boolean_field: true,
            boolean_field_m: [false],
        });
        let result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
            boolean_field: 0,
            boolean_field_m: [1],
        });
        expect(data).toMatchObject({
            boolean_field: false,
            boolean_field_m: [true],
        });
        result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
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

        let data = main.prepareData({
            date_field: new Date('2019-06-12T18:20:48.394Z'),
            date_field_m: [new Date('2019-06-12T18:20:48.394Z')],
        });
        expect(data).toMatchObject({
            date_field: '2019-06-12T18:20:48.394Z',
            date_field_m: ['2019-06-12T18:20:48.394Z'],
        });
        let result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
            date_field: '2019-06-12T18:20:48.394Z',
            date_field_m: ['2019-06-12T18:20:48.394Z'],
        });
        expect(data).toMatchObject({
            date_field: '2019-06-12T18:20:48.394Z',
            date_field_m: ['2019-06-12T18:20:48.394Z'],
        });
        result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
            date_field: '1560364245420',
            date_field_m: ['1560364245420'],
        });
        expect(data).toMatchObject({
            date_field: '2019-06-12T18:30:45.420Z',
            date_field_m: ['2019-06-12T18:30:45.420Z'],
        });
        result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
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

        let data = main.prepareData({
            reference_field: '4ef6f520-d180-4aee-9517-43214f396609',
            reference_field_m: ['4ef6f520-d180-4aee-9517-43214f396609'],
        });
        expect(data).toMatchObject({
            reference_field: '4ef6f520-d180-4aee-9517-43214f396609',
            reference_field_m: ['4ef6f520-d180-4aee-9517-43214f396609'],
        });
        let result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
            reference_field: undefined,
            reference_field_m: [null],
        });
        expect(data).toMatchObject({
            reference_field: null,
            reference_field_m: [],
        });
        result = await main.validateData(data);
        expect(result.errors).toEqual(null);

        data = main.prepareData({
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
