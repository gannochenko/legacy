import { BooleanField } from '../boolean';
import { StringField } from '../string';
import { ReferenceField } from '../reference';
import { ENTITY_PK_FIELD_NAME } from '../../../constants.both';
import { BaseField } from '../base';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('BaseField', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    // afterEach(async () => {
    // });

    describe('getSafeDeclaration()', () => {
        it('should remove all attributes with incorrect values', async () => {
            const field = new BooleanField({
                type: 100,
                name: 1000,
                length: 'a',
                label: 10,
                preview: 'a',
                required: 'b',
                unique: 'c',
                system: 'd',
            });

            expect(Object.keys(field.declaration)).toHaveLength(0);
        });

        it('should remove all redundant attributes', () => {
            const field = new BooleanField({
                type: 'boolean',
                name: 'foo',
                length: 100,
                label: 'la',
                preview: true,
                required: true,
                unique: true,
                some: 'other',
                field: 'bar',
                system: true,
            });

            expect(Object.keys(field.declaration)).toEqualArray([
                'type',
                'name',
                'length',
                'label',
                'preview',
                'unique',
                'required',
                'system',
            ]);
        });
    });

    describe('getHealth()', () => {
        it('should report if there is neither name nor type defined', async () => {
            const field = new BaseField({});
            const errors = await field.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_name_empty',
                fieldName: '',
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_type_empty',
                fieldName: '',
            });
        });

        it(`should report if field name is equal to ${ENTITY_PK_FIELD_NAME} (which is system-reserved)`, async () => {
            const field = new BaseField({
                name: ENTITY_PK_FIELD_NAME,
                type: 'string',
            });
            const errors = await field.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_name_illegal',
                fieldName: ENTITY_PK_FIELD_NAME,
            });
        });

        it('should report multipe-unique conflict', async () => {
            const field = new BaseField({
                name: 'blah',
                type: ['string'],
                unique: true,
            });
            const errors = await field.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_multiple_unique_conflict',
            });
        });
    });

    describe('getType()', () => {
        it('should return correct type for single field', async () => {
            const field = new BooleanField({
                type: 'boolean',
                name: 'foo',
            });

            expect(field.getType()).toEqual('boolean');
        });

        it('should return correct type for multiple field', async () => {
            const field = new BooleanField({
                type: ['boolean'],
                name: 'foo',
            });

            expect(field.getType()).toEqual(['boolean']);
        });
    });

    describe('getActualType()', () => {
        it('should return correct actual type for single field', async () => {
            const field = new BooleanField({
                type: 'boolean',
                name: 'foo',
            });

            expect(field.getActualType()).toEqual('boolean');
        });

        it('should return correct actual type for multiple field', async () => {
            const field = new BooleanField({
                type: ['boolean'],
                name: 'foo',
            });

            expect(field.getActualType()).toEqual('boolean');
        });
    });

    describe('getLength()', () => {
        it('should return correct length', async () => {
            const field = new StringField({
                type: 'string',
                name: 'foo',
                length: 50,
            });

            expect(field.getLength()).toEqual(50);
        });
    });

    describe('getName()', () => {
        it('should return correct name', async () => {
            const field = new StringField({
                type: 'string',
                name: 'foo',
            });

            expect(field.getName()).toEqual('foo');
        });
    });

    describe('getDisplayName()', () => {
        it('should return correct display name', async () => {
            const field = new StringField({
                type: 'string',
                name: 'foo_bar_bazz',
            });

            expect(field.getDisplayName()).toEqual('Foo bar bazz');
        });
    });

    describe('isMultiple()', () => {
        it('should return false for a single field', async () => {
            const field = new StringField({
                type: 'string',
                name: 'foo_bar_bazz',
            });

            expect(field.isMultiple()).toBeFalsy();
        });
        it('should return true for a multiple field', async () => {
            const field = new StringField({
                type: ['string'],
                name: 'foo_bar_bazz',
            });

            expect(field.isMultiple()).toBeTruthy();
        });
    });

    describe('isSortable()', () => {
        it('should return false for a multiple field', async () => {
            const field = new BaseField({
                type: ['string'],
                name: 'foo_bar_bazz',
            });

            expect(field.isSortable()).toBeFalsy();
        });
        it('should return false for a single non-reference field', async () => {
            const field = new BaseField({
                type: 'string',
                name: 'foo_bar_bazz',
            });

            expect(field.isSortable()).toBeTruthy();
        });
    });

    describe('isRequired()', () => {
        it('should return correct required flag', async () => {
            const field = new BaseField({
                type: ['string'],
                name: 'foo',
                required: true,
            });

            expect(field.isRequired()).toBeTruthy();
        });
    });

    describe('isPreview()', () => {
        it('should return correct preview flag', async () => {
            const field = new BaseField({
                type: ['string'],
                name: 'foo',
                preview: true,
            });

            expect(field.isPreview()).toBeTruthy();
        });
    });

    describe('isUnique()', () => {
        it('should return true for non-reference single field', async () => {
            const field = new BaseField({
                type: 'string',
                name: 'foo',
                unique: true,
            });

            expect(field.isUnique()).toBeTruthy();
        });
    });

    describe('isSystem()', () => {
        it('should return true if the field is maked as system', async () => {
            const field = new BaseField({
                type: 'string',
                name: 'foo',
                system: true,
            });

            expect(field.isSystem()).toBeTruthy();
        });
    });

    describe('toJSON()', () => {
        it('should return return JSON declaration', async () => {
            const field = new BaseField({
                type: 'string',
                name: 'foo',
                system: true,
            });

            expect(JSON.stringify(field)).toEqual(
                JSON.stringify({
                    type: 'string',
                    name: 'foo',
                    system: true,
                }),
            );
        });
    });

    describe('castValue()', () => {
        it('should cast single value', async () => {
            const field = new BaseField({
                type: 'string',
                name: 'foo',
            });

            expect(field.castValue('lalala')).toEqual('lalala');
        });

        it('should cast multiple values throwing out nulls and undefineds', async () => {
            const field = new BaseField({
                type: ['string'],
                name: 'foo',
            });

            expect(field.castValue(['la', null, undefined, 'lo'])).toEqual([
                'la',
                'lo',
            ]);
        });

        it('should not cast multiple to single and back', async () => {
            const fieldSingle = new BaseField({
                type: 'string',
                name: 'foo',
            });

            expect(fieldSingle.castValue(['one', 'two'])).toEqual([
                'one',
                'two',
            ]);

            const fieldMultiple = new BaseField({
                type: ['string'],
                name: 'foo',
            });

            expect(fieldMultiple.castValue('one')).toEqual('one');
        });
    });

    describe('isReference()', () => {
        it('should return false for a non-reference field', async () => {
            const field = new BaseField({
                type: ['string'],
                name: 'foo',
                preview: true,
            });

            expect(field.isReference()).toBeFalsy();
        });
    });
});
