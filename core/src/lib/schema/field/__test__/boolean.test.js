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

            expect(field.castValueItem(null)).toEqual(null);
            expect(field.castValueItem(undefined)).toEqual(null);
        });
    });

    describe('getValidator()', () => {
        it('should report illegal data', async () => {
            const field = new BooleanField({
                type: 'boolean',
                name: 'foo',
            });

            let errors = null;
            try {
                await field.getValidator().validate('la', {
                    abortEarly: false,
                    // strict: true,
                });
            } catch (validationErrors) {
                errors = validationErrors.inner.map(error => ({
                    message: error.message,
                    fieldName: error.path,
                }));
            }

            expect(errors).toHaveLength(1);
            expect(errors[0]).toEqual({
                message: "The value of 'Foo' is not a boolean",
                fieldName: undefined,
            });
        });
        it('should not report legal data', async () => {
            const field = new BooleanField({
                type: 'boolean',
                name: 'foo',
            });

            let errors = null;
            try {
                await field.getValidator().validate(true, {
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
