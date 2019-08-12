import { BooleanField } from '../boolean';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('BooleanField', () => {
    describe('castValue()', () => {
        it('should cast values to legal', async () => {
            const field = new BooleanField({
                type: 'boolean',
                name: 'foo',
            });

            expect(field.castValueItem(true)).toEqual(true);
            expect(field.castValueItem(false)).toEqual(false);

            expect(field.castValueItem(0)).toEqual(false);
            expect(field.castValueItem(1)).toEqual(true);

            expect(field.castValueItem('0')).toEqual(true);
            expect(field.castValueItem('1')).toEqual(true);
        });
    });
});
