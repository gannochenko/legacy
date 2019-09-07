/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import { makeField } from '../make-field';
import { StringField } from '../string';
import { BooleanField } from '../boolean';
import { IntegerField } from '../integer';
import { DateTimeField } from '../datetime';
import { ReferenceField } from '../reference';
import { ENTITY_ID_FIELD_NAME } from '../../../constants.both';
import { IdStringField } from '../id-string';

describe('MakeField', () => {
    describe('should create string field', () => {
        it('after single declaration', async () => {
            const field = makeField({
                type: 'string.ts',
                name: 'foo',
            });

            expect(field).toBeInstanceOf(StringField);
        });

        it('after multiple declaration', async () => {
            const field = makeField({
                type: ['string.ts'],
                name: 'foo',
            });

            expect(field).toBeInstanceOf(StringField);
        });
    });

    describe('should create boolean field', () => {
        it('after single declaration', async () => {
            const field = makeField({
                type: 'boolean.ts',
                name: 'foo',
            });

            expect(field).toBeInstanceOf(BooleanField);
        });

        it('after multiple declaration', async () => {
            const field = makeField({
                type: ['boolean.ts'],
                name: 'foo',
            });

            expect(field).toBeInstanceOf(BooleanField);
        });
    });

    describe('should create integer field', () => {
        it('after single declaration', async () => {
            const field = makeField({
                type: 'integer',
                name: 'foo',
            });

            expect(field).toBeInstanceOf(IntegerField);
        });

        it('after multiple declaration', async () => {
            const field = makeField({
                type: ['integer'],
                name: 'foo',
            });

            expect(field).toBeInstanceOf(IntegerField);
        });
    });

    describe('should create datetime field', () => {
        it('after single declaration', async () => {
            const field = makeField({
                type: 'datetime.ts',
                name: 'foo',
            });

            expect(field).toBeInstanceOf(DateTimeField);
        });

        it('after multiple declaration', async () => {
            const field = makeField({
                type: ['datetime.ts'],
                name: 'foo',
            });

            expect(field).toBeInstanceOf(DateTimeField);
        });
    });

    describe('should create reference field', () => {
        it('after single declaration', async () => {
            const field = makeField({
                type: 'ref',
                name: 'foo',
            });

            expect(field).toBeInstanceOf(ReferenceField);
        });

        it('after multiple declaration', async () => {
            const field = makeField({
                type: ['ref'],
                name: 'foo',
            });

            expect(field).toBeInstanceOf(ReferenceField);
        });
    });

    describe(`should create ${ENTITY_ID_FIELD_NAME} field`, () => {
        it('after single declaration', async () => {
            const field = makeField({
                type: 'string.ts',
                name: ENTITY_ID_FIELD_NAME,
            });

            expect(field).toBeInstanceOf(IdStringField);
        });
    });
});
