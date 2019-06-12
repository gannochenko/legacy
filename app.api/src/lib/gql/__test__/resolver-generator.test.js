/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import ResolverGenerator from '../resolver-generator';
import DatabaseEntityManager from '../../database/entity-manager';
import { Schema } from 'project-minimum-core';
import schemaJSON from '../../../__test__/schema';
import mockRepository from '../../../__test__/repository.mock';
import { makeAST } from '../../../__test__/apollo.mock';

let schema = null;
let databaseManager = null;
let repository = null;
let resolvers = null;

describe('GQL Resolver Generator', () => {
    beforeAll(async () => {
        schema = new Schema({
            schema: schemaJSON,
            draft: true,
            version: 2,
        });
        databaseManager = new DatabaseEntityManager(schema);

        const { repository: mockedRepository, connection } = mockRepository(
            'important_person',
        );
        repository = mockedRepository;

        resolvers = await ResolverGenerator.make(
            schema,
            databaseManager,
            connection,
        );
    });
    // beforeEach(async () => {
    // });

    it('get(): should produce the resolver', async () => {
        expect(resolvers[0].Query.ImportantPersonGet).toBeInstanceOf(Function);
    });

    it('get(): should report code missing', async () => {
        const get = resolvers[0].Query.ImportantPersonGet;

        // call with no parameters
        let result = await get({}, {});
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toEqual('code_missing');
    });

    it('get(): should report not found', async () => {
        const get = resolvers[0].Query.ImportantPersonGet;

        let result = await get({}, { code: '   does_not_exist' });
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toEqual('not_found');
        expect(repository.findOne.mock.calls[0][0]).toMatchObject({
            where: { code: 'does_not_exist' },
            select: ['id', 'code'],
        });
    });

    it('get(): should return effective data', async () => {
        const get = resolvers[0].Query.ImportantPersonGet;

        let result = await get(
            {},
            { code: '4ef6f520-d180-4aee-9517-43214f396609' },
            null,
            {},
        );
        expect(result.errors).toHaveLength(0);
        expect(result.data).toMatchObject({
            code: '4ef6f520-d180-4aee-9517-43214f396609',
            id: 1,
        });
    });

    it('get(): should limit the amount of selected fields', async () => {
        const get = resolvers[0].Query.ImportantPersonGet;

        let result = await get(
            {},
            { code: '4ef6f520-d180-4aee-9517-43214f396609' },
            null,
            makeAST('data', ['full_name', 'has_pets']),
        );
        expect(result.data).toMatchObject({
            code: '4ef6f520-d180-4aee-9517-43214f396609',
            full_name: 'Max Mustermann',
            has_pets: true,
            id: 1,
        });
    });
});
