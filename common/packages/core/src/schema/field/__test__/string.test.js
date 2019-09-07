import { StringField } from '../string';

/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

describe('StringField', () => {
    describe('castValue()', () => {
        it('should cast values to legal', async () => {
            const field = new StringField({
                type: 'string.ts',
                name: 'foo',
            });

            expect(field.castValueItem(10)).toEqual('10');
            expect(field.castValueItem('10')).toEqual('10');
            expect(field.castValueItem('a')).toEqual('a');
            expect(field.castValueItem(null)).toEqual(null);
            expect(field.castValueItem(undefined)).toEqual(null);
        });
    });

    describe('getValidator()', () => {
        it('should not report data that can be casted', async () => {
            const field = new StringField({
                type: 'string.ts',
                name: 'foo',
            });

            let errors = null;
            try {
                await field.getValidator().validate(10, {
                    abortEarly: false,
                    // strict: true,
                });
            } catch (validationErrors) {
                errors = validationErrors.inner.map(error => ({
                    message: error.message,
                    fieldName: error.path,
                }));
            }

            expect(errors).toEqual(null);
        });
        it('should not report legal data', async () => {
            const field = new StringField({
                type: 'string.ts',
                name: 'foo',
            });

            let errors = null;
            try {
                await field.getValidator().validate('10', {
                    abortEarly: false,
                    // strict: true,
                });
            } catch (validationErrors) {
                errors = validationErrors.inner.map(error => ({
                    message: error.message,
                    fieldName: error.path,
                }));
            }

            expect(errors).toEqual(null);
        });
    });
});
