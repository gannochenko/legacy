/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import { IdStringField } from '../id-string';
import { ENTITY_ID_FIELD_NAME } from '../../../constants.both';

describe('IdStringField', () => {
    describe('getHealth()', () => {
        it(`should report invalid ${ENTITY_ID_FIELD_NAME} field health check`, async () => {
            const field = new IdStringField({
                name: ENTITY_ID_FIELD_NAME,
                type: 'boolean',
            });

            const errors = await field.getHealth();

            expect(errors).toMatchObjectInArray({
                code: 'field_not_system',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_id_not_unique',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_id_not_string',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
            expect(errors).toMatchObjectInArray({
                code: 'field_id_illegal_length',
                fieldName: ENTITY_ID_FIELD_NAME,
            });
        });
    });
});
