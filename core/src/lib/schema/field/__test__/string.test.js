import { StringField } from '../string';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('StringField', () => {
    describe('castValue()', () => {
        it('should cast values to legal', async () => {
            const field = new StringField({
                type: 'string',
                name: 'foo',
            });

            expect(field.castValueItem(10)).toEqual('10');
            expect(field.castValueItem('10')).toEqual('10');
            expect(field.castValueItem('a')).toEqual('a');
            expect(field.castValueItem(null)).toEqual(null);
            expect(field.castValueItem(undefined)).toEqual(null);
        });
    });
});
