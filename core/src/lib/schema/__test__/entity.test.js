import { Entity } from '../entity';

describe('Entity', () => {
    it('should report on nameless entity', async () => {
        const entity = new Entity({
            schema: [],
        });

        const errors = await entity.checkHealth();
        expect(errors).toMatchObjectInArray({ code: 'entity_name_empty' });
        expect(errors).toMatchObjectInArray({ code: 'entity_schema_empty' });
        expect(errors).toMatchObjectInArray({
            code: 'entity_code_field_missing',
        });
    });

    it('should report invalid fieldset health check', async () => {
        const name = 'test';
        const entity = new Entity({
            name,
            schema: [
                {
                    name: 'i_have_a_name',
                    type: 'boolean',
                },
                {
                    name: '',
                    type: 'string',
                },
            ],
        });

        const errors = await entity.checkHealth();
        expect(errors).toMatchObjectInArray({
            code: 'field_illegal',
            fieldName: 'name',
        });
    });
});
