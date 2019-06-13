import { Entity } from '../entity';
import makeStubEntity from '../../__test__/stub-entity';
// import { TYPE_STRING, TYPE_BOOLEAN, TYPE_DATETIME, TYPE_INTEGER } from '../../field-types';

describe('Entity', () => {
    it('should report on nameless entity', async () => {
        const entity = new Entity({
            schema: [],
        });

        const errors = await entity.checkHealth();
        expect(errors).toMatchObjectInArray({ code: 'entity_name_empty' });
        expect(errors).toMatchObjectInArray({ code: 'entity_schema_empty' });
        expect(errors).toMatchObjectInArray({
            code: 'entity_code_field_missing',
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

        const errors = await entity.checkHealth();
        expect(errors).toMatchObjectInArray({
            code: 'field_illegal',
            fieldName: 'name',
        });
        expect(errors).toMatchObjectInArray({
            code: 'entity_code_field_missing',
        });
    });

    it('should report invalid code field health check', async () => {
        const name = 'test';
        const entity = new Entity({
            name,
            schema: [
                {
                    name: 'code',
                    type: 'boolean',
                },
                {
                    name: 'i_have_a_name',
                    type: 'boolean',
                },
            ],
        });

        const errors = await entity.checkHealth();
        expect(errors).toMatchObjectInArray({
            code: 'field_code_not_mandatory',
            fieldName: 'code',
        });
        expect(errors).toMatchObjectInArray({
            code: 'field_code_not_unique',
            fieldName: 'code',
        });
        expect(errors).toMatchObjectInArray({
            code: 'field_code_not_string',
            fieldName: 'code',
        });
        expect(errors).toMatchObjectInArray({
            code: 'field_code_illegal_length',
            fieldName: 'code',
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
            string_field_m: 'A',
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
            string_field_m: [null],
        });

        data = main.prepareData({
            string_field: undefined,
            string_field_m: [undefined],
        });
        expect(data).toMatchObject({
            string_field: null,
            string_field_m: [null],
        });

        data = main.prepareData({
            string_field: 1000,
            string_field_m: [1000],
        });
        expect(data).toMatchObject({
            string_field: '1000',
            string_field_m: ['1000'],
        });

        data = main.prepareData({
            string_field: new Date('2019-06-12T18:20:48.394Z'),
            string_field_m: [new Date('2019-06-12T18:20:48.394Z')],
        });
        expect(data).toMatchObject({
            string_field: 'Wed Jun 12 2019 20:20:48 GMT+0200 (EET)',
            string_field_m: ['Wed Jun 12 2019 20:20:48 GMT+0200 (EET)'],
        });
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

        data = main.prepareData({
            boolean_field: 0,
            boolean_field_m: [1],
        });
        expect(data).toMatchObject({
            boolean_field: false,
            boolean_field_m: [true],
        });

        data = main.prepareData({
            boolean_field: '0',
            boolean_field_m: ['1'],
        });
        expect(data).toMatchObject({
            boolean_field: true,
            boolean_field_m: [true],
        });
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

        data = main.prepareData({
            date_field: '2019-06-12T18:20:48.394Z',
            date_field_m: ['2019-06-12T18:20:48.394Z'],
        });
        expect(data).toMatchObject({
            date_field: '2019-06-12T18:20:48.394Z',
            date_field_m: ['2019-06-12T18:20:48.394Z'],
        });

        data = main.prepareData({
            date_field: '1560364245420',
            date_field_m: ['1560364245420'],
        });
        expect(data).toMatchObject({
            date_field: '2019-06-12T18:30:45.420Z',
            date_field_m: ['2019-06-12T18:30:45.420Z'],
        });

        data = main.prepareData({
            date_field: 'not_a_date',
            date_field_m: ['not_a_date'],
        });
        expect(data).toMatchObject({
            date_field: 'not_a_date',
            date_field_m: ['not_a_date'],
        });
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

        data = main.prepareData({
            reference_field: undefined,
            reference_field_m: [null],
        });
        expect(data).toMatchObject({
            reference_field: null,
            reference_field_m: [],
        });

        data = main.prepareData({
            reference_field_m: [
                null,
                undefined,
                '4ef6f520-d180-4aee-9517-43214f396609',
                new Date('2019-06-12T18:30:45.420Z'),
            ],
        });
        expect(data).toMatchObject({
            reference_field_m: [
                '4ef6f520-d180-4aee-9517-43214f396609',
                'Wed Jun 12 2019 20:30:45 GMT+0200 (EET)',
            ],
        });
    });
});
