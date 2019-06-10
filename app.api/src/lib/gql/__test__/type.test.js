import TypeGenerator from '../type-generator';
import { Schema } from 'project-minimum-core';
import schemaJSON from '../../../__test__/schema';

describe('GQL Type generator', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    it('Should generate gql type declaration', async () => {
        const schema = new Schema({
            schema: schemaJSON,
            draft: true,
            version: 2,
        });
        const gql = await TypeGenerator.make(schema);
        expect(gql).toMatchSnapshot();
    });
});
