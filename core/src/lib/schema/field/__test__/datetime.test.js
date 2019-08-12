import { DateTimeField } from '../datetime';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('DateTimeField', () => {
    describe('castValue()', () => {
        it('should cast values to legal', async () => {
            const field = new DateTimeField({
                type: 'datetime',
                name: 'foo',
            });

            expect(field.castValueItem('2019-06-12T18:20:48.394Z')).toEqual(
                '2019-06-12T18:20:48.394Z',
            );
            expect(field.castValueItem('1560364245420')).toEqual(
                '2019-06-12T18:30:45.420Z',
            );
            expect(field.castValueItem(1560364245420)).toEqual(
                '2019-06-12T18:30:45.420Z',
            );
            expect(field.castValueItem('not_a_date')).toEqual('not_a_date');

            expect(field.castValueItem(null)).toEqual(null);
            expect(field.castValueItem(undefined)).toEqual(null);
        });
    });
});
