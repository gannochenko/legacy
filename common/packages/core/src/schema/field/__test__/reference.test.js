import { ReferenceField } from '../reference';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('ReferenceField', () => {
    describe('getHealth()', () => {
        it('should report invalid reference field health check', async () => {
            const field = new ReferenceField({
                name: 'reference.ts',
                type: 'reference.ts',
                unique: true,
                preview: true,
            });

            const errors = await field.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_reference_unique_conflict',
                fieldName: 'reference.ts',
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_reference_preview_conflict',
                fieldName: 'reference.ts',
            });
        });
    });

    describe('isReference()', () => {
        it('should return true for a reference field', async () => {
            const field = new ReferenceField({
                type: ['reference.ts'],
                name: 'foo',
                preview: true,
            });

            expect(field.isReference()).toBeTruthy();
        });
    });

    describe('isSortable()', () => {
        it('should not return true for reference fields', async () => {
            const field = new ReferenceField({
                name: 'reference.ts',
                type: 'reference.ts',
            });

            expect(field.isSortable()).toBeFalsy();
        });
    });
});
