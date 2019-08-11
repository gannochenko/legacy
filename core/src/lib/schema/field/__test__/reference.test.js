import { ReferenceField } from '../reference';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('ReferenceField', () => {
    describe('getHealth()', () => {
        it('should report invalid reference field health check', async () => {
            const field = new ReferenceField({
                name: 'reference',
                type: 'reference',
                unique: true,
                preview: true,
            });

            const errors = await field.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_reference_unique_conflict',
                fieldName: 'reference',
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_reference_preview_conflict',
                fieldName: 'reference',
            });
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

    describe('isSortable()', () => {
        it('should not return true for reference filds', async () => {
            const field = new ReferenceField({
                name: 'reference',
                type: 'reference',
            });

            expect(field.isSortable()).toBeFalsy();
        });
    });
});
