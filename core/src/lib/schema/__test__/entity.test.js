import { Entity } from '../entity';

describe('Entity', () => {
    it('should report invalid health check', async () => {
        const entity = new Entity({
            schema: [
                {
                    name: 'i_have_a_name',
                    type: 1000,
                    required: 'not_boolean',
                },
                {
                    type: 'string',
                    required: true,
                },
            ],
        });

        console.dir(entity);
        const errors = await entity.checkHealth();
        console.dir(errors);
    });
});
