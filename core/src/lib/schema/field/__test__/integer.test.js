import { IntegerField } from '../integer';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('IntegerField', () => {
    describe('castValue()', () => {
        it('should cast values to legal', async () => {
            const field = new IntegerField({
                type: 'integer',
                name: 'foo',
            });

            expect(field.castValueItem(10)).toEqual(10);
            expect(field.castValueItem('10')).toEqual(10);
            expect(field.castValueItem('a')).toEqual('a');
        });
    });
});
