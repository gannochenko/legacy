import { ReferenceField } from '../reference';
import { BaseField } from '../base';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('ReferenceField', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    // afterEach(async () => {
    // });

    describe('isSortable()', () => {
        it('should return false for any reference field', async () => {
            const field1 = new ReferenceField({
                type: 'reference',
                name: 'foo_bar_bazz',
            });

            expect(field1.isSortable()).toBeFalsy();

            const field2 = new ReferenceField({
                type: ['reference'],
                name: 'foo_bar_bazz',
            });

            expect(field2.isSortable()).toBeFalsy();
        });
    });

    describe('isReference()', () => {
        it('should return true for a reference field', async () => {
            const field = new ReferenceField({
                type: ['reference'],
                name: 'foo',
                preview: true,
            });

            expect(field.isReference()).toBeTruthy();
        });
    });

    describe('isPreview()', () => {
        it('should return false for a reference field', async () => {
            const field = new ReferenceField({
                type: ['reference'],
                name: 'foo',
                preview: true,
            });

            expect(field.isPreview()).toBeFalsy();
        });
    });
});
