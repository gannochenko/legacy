import { Schema } from '@project-minimum/core';
import TypeGenerator from '../type-generator';
import schemaJSON from '../../../__test__/schema';

describe('GQL Type generator', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    describe('make()', () => {
        it('should generate gql type declaration', async () => {
            const schema = new Schema({
                schema: schemaJSON,
                draft: true,
                version: 2,
            });
            const gql = TypeGenerator.make(schema);
            expect(gql).toMatchSnapshot();
        });

        it('should handle empty schema correctly', async () => {
            const schema = new Schema({});
            const gql = TypeGenerator.make(schema);
            expect(gql).toEqual([]);
        });
    });
});
