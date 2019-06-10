/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import ResolverGenerator from '../resolver-generator';
import DatabaseEntityManager from '../../database/entity-manager';
import { Schema } from 'project-minimum-core';
import schemaJSON from '../../../__test__/schema';
import mockData from '../../../__test__/mock-data';

let schema = null;
let databaseManager = null;

describe('GQL Resolver Generator', () => {
    beforeAll(async () => {
        schema = new Schema({
            schema: schemaJSON,
            draft: true,
            version: 2,
        });
        databaseManager = new DatabaseEntityManager(schema);
    });
    // beforeEach(async () => {
    // });
    it('should produce query get resolver', async () => {
        const repository = {
            findOne: jest.fn(),
        };
        const connection = {
            getRepository: jest.fn(() => {
                return repository;
            }),
        };

        const resolvers = await ResolverGenerator.make(
            schema,
            databaseManager,
            connection,
        );
        expect(resolvers[0].Query.ImportantPersonGet).toBeInstanceOf(Function);
        const get = resolvers[0].Query.ImportantPersonGet;

        // call with no parameters
        let result = await get({}, {});
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toEqual('code_missing');

        // not found
        result = await get({}, { code: '   does_not_exist' });
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toEqual('not_found');
        expect(repository.findOne.mock.calls[0][0].code).toEqual(
            'does_not_exist',
        );

        // check the result
        repository.findOne.mockImplementation(() => {
            return mockData.important_person[0];
        });
        result = await get({}, { code: '4ef6f520-d180-4aee-9517-43214f39660' });
        console.dir(result);
    });
});
