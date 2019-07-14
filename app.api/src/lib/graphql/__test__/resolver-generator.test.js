/**
 * https://github.com/sapegin/jest-cheat-sheet
 * https://jestjs.io/docs/en/mock-function-api.html
 */

import ResolverGenerator from '../resolver-generator';
import DatabaseEntityManager from '../../database/entity-manager';
import { Schema } from 'project-minimum-core';
import schemaJSON from '../../../__test__/schema';
import {
    makeConnection,
    data as mockedData,
} from '../../../__test__/repository.mock';
import { makeAST } from '../../../__test__/apollo.mock';
import DataLoaderPool from '../../database/data-loader-pool';

let schema = null;
let databaseManager = null;
let repository = null;
let resolvers = null;
let connection = null;

describe('GQL Resolver Generator', () => {
    beforeAll(async () => {
        schema = new Schema({
            schema: schemaJSON,
            draft: true,
            version: 2,
        });
        databaseManager = new DatabaseEntityManager(schema);

        // console.log(require('util').inspect(databaseManager.get(), { depth: 10 }));

        connection = makeConnection();
        repository = connection.getRepositoryByEntityName('important_person');

        resolvers = await ResolverGenerator.make(
            schema,
            databaseManager,
            connection,
        );
    });
    beforeEach(async () => {
        connection.cleanup();
    });

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

    it('find(): should produce the resolver', async () => {
        expect(resolvers[0].Query.ImportantPersonFind).toBeInstanceOf(Function);
    });

    it('find(): should return effective data', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find({}, {}, null, {});
        expect(result).toMatchObject({
            data: [
                { code: '4ef6f520-d180-4aee-9517-43214f396609', id: 1 },
                { code: '9e9c4ee3-d92e-48f2-8235-577806c12534', id: 2 },
                { code: '2a98f71a-a3f6-43a1-8196-9a845ba8a54f', id: 3 },
            ],
            errors: [],
            limit: 50,
            offset: 0,
        });
    });

    it('find(): should process limit and offset', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find(
            {},
            { limit: 1, offset: 1 },
            null,
            makeAST('data', ['full_name']),
        );

        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(result.limit).toEqual(1);
        expect(result.offset).toEqual(1);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].code).toEqual(
            '9e9c4ee3-d92e-48f2-8235-577806c12534',
        );
    });

    it('find(): should process page and pageCount', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find(
            {},
            { page: 2, pageSize: 1 },
            null,
            makeAST('data', ['full_name']),
        );

        expect(repository.find).toHaveBeenCalledTimes(1);
        expect(result.limit).toEqual(1);
        expect(result.offset).toEqual(1);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].code).toEqual(
            '9e9c4ee3-d92e-48f2-8235-577806c12534',
        );
    });

    it('find(): should process sort order', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        await find(
            {},
            { sort: { full_name: 'ASC' } },
            null,
            makeAST('data', ['full_name']),
        );

        expect(repository.find.mock.calls[0][0].order).toMatchObject({
            full_name: 'ASC',
        });
    });

    it('find(): should process filter [todo]', async () => {
        // todo
    });

    it('find(): should control the maximum amount of items to return', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find({}, { limit: 1000 }, null, {});

        expect(result.data).toHaveLength(0);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toMatchObject({
            code: 'limit_too_high',
            message: 'Limit too high',
        });
    });

    it('find(): should limit the amount of selected fields', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find(
            {},
            {},
            null,
            makeAST('data', ['full_name', 'has_pets']),
        );
        expect(result.data).toMatchObject([
            {
                code: '4ef6f520-d180-4aee-9517-43214f396609',
                full_name: 'Max Mustermann',
                has_pets: true,
                id: 1,
            },
            {
                code: '9e9c4ee3-d92e-48f2-8235-577806c12534',
                full_name: 'Mister Twister',
                has_pets: false,
                id: 2,
            },
            {
                code: '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                full_name: 'Sonoya Mizuno',
                has_pets: false,
                id: 3,
            },
        ]);
    });

    it('find(): should return only codes if no select fields specified [todo]', async () => {
        // todo
    });

    it('find(): should return count by filter', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find({}, {}, null, makeAST('count', []));

        expect(result.errors).toHaveLength(0);
        expect(result.count).toEqual(3);
    });

    it('find(): should accept filter or search, but not both', async () => {
        const find = resolvers[0].Query.ImportantPersonFind;

        let result = await find(
            {},
            {
                filter: {},
                search: 'hello',
            },
            null,
            makeAST('count', []),
        );

        expect(result.data).toHaveLength(0);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toMatchObject({
            code: 'search_filter_conflict',
            message: 'You can not set both search and filter at the same time',
        });
    });

    it('put(): should create a new item', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                data: {
                    full_name: 'hello!',
                    has_pets: false,
                },
            },
            null,
            {},
        );
        expect(result.errors).toHaveLength(0);
        expect(result.code).toHaveLength(36); // assigns a new code
        expect(result.data).toMatchObject({
            full_name: 'hello!',
            has_pets: false,
        });

        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );

        // calls create to make a new item
        const createCall = importantPersonRepository.create.mock.calls[0];
        expect(createCall[0]).toMatchObject({
            full_name: 'hello!',
            has_pets: false,
        });

        // does not call findOne
        expect(importantPersonRepository.findOne).toHaveBeenCalledTimes(0);

        // does not call merge
        expect(importantPersonRepository.merge).toHaveBeenCalledTimes(0);

        // calls save
        const saveCall = importantPersonRepository.save.mock.calls[0];
        expect(saveCall[0]).toMatchObject({
            full_name: 'hello!',
            has_pets: false,
        });
    });

    it('put(): should update an existing item', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                code: '4ef6f520-d180-4aee-9517-43214f396609',
                data: {
                    full_name: 'hello!',
                },
            },
            null,
            {},
        );

        expect(result.errors).toHaveLength(0);
        expect(result.code).toEqual('4ef6f520-d180-4aee-9517-43214f396609');
        expect(result.data).toMatchObject({ full_name: 'hello!', id: 1 });

        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );

        // check that findOne was called
        expect(importantPersonRepository.findOne).toHaveBeenCalledTimes(1);
        expect(
            importantPersonRepository.findOne.mock.calls[0][0],
        ).toMatchObject({
            where: { code: '4ef6f520-d180-4aee-9517-43214f396609' },
            select: ['id'],
        });

        // check that create was not called
        expect(importantPersonRepository.create).toHaveBeenCalledTimes(0);

        // check that merge was called
        expect(importantPersonRepository.merge).toHaveBeenCalledTimes(1);

        // check that save was called
        const saveCall = importantPersonRepository.save.mock.calls[0];
        expect(saveCall[0]).toMatchObject({
            id: 1,
            full_name: 'hello!',
        });
    });

    it('put(): should not allow to set the code from the data argument', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                data: {
                    code: '4ef6f520-d180-4aee-9517-43214f396609',
                    full_name: 'hello!',
                },
            },
            null,
            {},
        );

        expect(result.errors).toHaveLength(0);
        expect(result.data).toMatchObject({ full_name: 'hello!' });
        expect(result.code).not.toEqual('4ef6f520-d180-4aee-9517-43214f396609');
    });

    it('put(): should not accept invalid data for saving', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                data: {},
            },
            null,
            {},
        );

        expect(result.code).toEqual(null);
        expect(result.data).toEqual({});
        expect(result.errors).toMatchObject([
            {
                message: 'Full name is required',
                code: 'validation',
                reference: 'full_name',
            },
        ]);
    });

    it('put(): should return an item only when it is asked [todo]', async () => {
        // todo
    });

    it('put(): should manage relations', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                data: {
                    full_name: 'hello!',
                    partner: '4ef6f520-d180-4aee-9517-43214f396609',
                    pets: [
                        '01f6f520-d180-4aee-9517-43214f396609',
                        '02f6f520-d180-4aee-9517-43214f396609',
                    ],
                },
            },
            null,
            {},
        );

        expect(result.errors).toHaveLength(0);
        expect(result.data).toMatchObject({
            full_name: 'hello!',
            partner: 1,
        });

        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );

        // maps codes to ids on person repo (because of that "partner" field set)
        let codeToIdCall = importantPersonRepository.find.mock.calls[0];
        expect(codeToIdCall).toBeDefined();
        expect(codeToIdCall[0].where.code._value).toEqual([
            '4ef6f520-d180-4aee-9517-43214f396609',
        ]);
        expect(codeToIdCall[0].select).toEqual(['id', 'code']);

        // now for "pet" entity
        const petRepository = connection.getRepositoryByEntityName('pet');

        // maps codes to ids on pet repo (because of that "pets" field set)
        codeToIdCall = petRepository.find.mock.calls[0];
        expect(codeToIdCall).toBeDefined();
        expect(codeToIdCall[0].where.code._value).toEqual([
            '01f6f520-d180-4aee-9517-43214f396609',
            '02f6f520-d180-4aee-9517-43214f396609',
        ]);
        expect(codeToIdCall[0].select).toEqual(['id', 'code']);

        const petsRepository = connection.getRepositoryByEntityName(
            'eq_ref_ba4ed80327568d335915e4452eb0703a',
        );
        const petsRepositoryQueryBuilder = petsRepository.queryBuilder;

        expect(petsRepositoryQueryBuilder.delete).toHaveBeenCalledTimes(1);
        expect(petsRepositoryQueryBuilder.insert).toHaveBeenCalledTimes(1);
        expect(
            petsRepositoryQueryBuilder.values.mock.calls[0][0],
        ).toMatchObject([
            { self: undefined, rel: 1 },
            { self: undefined, rel: 2 },
        ]);

        // two times - first for delete(), second - for insert()
        expect(petsRepositoryQueryBuilder.execute).toHaveBeenCalledTimes(2);
    });

    it('put(): should not touch any multiple relations if there were no changes', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                data: {
                    full_name: 'hello!',
                },
            },
            null,
            {},
        );

        // no change for a single relation
        expect(result.data.partner).not.toBeDefined();

        // no change for multiple relations
        const petsRepository = connection.getRepositoryByEntityName(
            'eq_ref_ba4ed80327568d335915e4452eb0703a',
        );
        const petsRepositoryQueryBuilder = petsRepository.queryBuilder;

        expect(petsRepositoryQueryBuilder.delete).toHaveBeenCalledTimes(0);
        expect(petsRepositoryQueryBuilder.insert).toHaveBeenCalledTimes(0);
    });

    it('put(): should return error when trying to update non-existing item', async () => {
        const put = resolvers[0].Mutation.ImportantPersonPut;

        let result = await put(
            {},
            {
                code: 'missing-item',
                data: {
                    full_name: 'hello!',
                },
            },
            null,
            {},
        );

        expect(result.code).toEqual(null);
        expect(result.data).toEqual({});
        expect(result.errors).toMatchObject([
            { code: 'not_found', message: 'Element not found' },
        ]);
    });

    it('delete(): should delete an element and all its multiple references', async () => {
        const mutationDelete = resolvers[0].Mutation.ImportantPersonDelete;

        let result = await mutationDelete(
            {},
            {
                code: '4ef6f520-d180-4aee-9517-43214f396609',
            },
            null,
            {},
        );

        expect(result.errors).toHaveLength(0);
        expect(result.code).toEqual('4ef6f520-d180-4aee-9517-43214f396609');

        // the item itself was dropped
        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );
        expect(importantPersonRepository.delete).toHaveBeenCalledTimes(1);
        expect(importantPersonRepository.delete.mock.calls[0][0]).toEqual(1);

        // multiple relations dropped
        const petsRepository = connection.getRepositoryByEntityName(
            'eq_ref_ba4ed80327568d335915e4452eb0703a',
        );
        const petsRepositoryQueryBuilder = petsRepository.queryBuilder;

        expect(petsRepositoryQueryBuilder.delete).toHaveBeenCalledTimes(1);
        expect(petsRepositoryQueryBuilder.execute).toHaveBeenCalledTimes(1);
    });

    it('delete(): should return error if the code is not set', async () => {
        const mutationDelete = resolvers[0].Mutation.ImportantPersonDelete;

        let result = await mutationDelete({}, {}, null, {});

        expect(result.errors).toMatchObject([
            { code: 'illegal_code', message: 'Code is illegal' },
        ]);
    });

    it('delete(): should return error if the element is originally missing', async () => {
        const mutationDelete = resolvers[0].Mutation.ImportantPersonDelete;

        let result = await mutationDelete(
            {},
            {
                code: 'missing-item',
            },
            null,
            {},
        );

        expect(result.errors).toMatchObject([
            { code: 'not_found', message: 'Element not found' },
        ]);
    });

    it('reference(single): should get referenced data', async () => {
        const getPartner = resolvers[0].ImportantPerson.partner;
        expect(getPartner).toBeInstanceOf(Function);

        let result = await getPartner(
            { full_name: 'Test Testov', partner: 1 }, // this "comes" from the database, that is why there is id, not code
            {},
            {
                dataLoaderPool: new DataLoaderPool(),
            },
            makeAST('', ['full_name']),
        );

        expect(result).toMatchObject({
            id: 1,
            code: '4ef6f520-d180-4aee-9517-43214f396609',
            full_name: 'Max Mustermann',
        });
    });

    it('reference(single): should utilize bulk load', async () => {
        const getPartner = resolvers[0].ImportantPerson.partner;
        expect(getPartner).toBeInstanceOf(Function);

        const dataLoaderPool = new DataLoaderPool();
        const allResults = [];

        await Promise.all(
            [1, 2, 10, 3].map(id =>
                getPartner(
                    { partner: id }, // this "comes" from the database, that is why there is id, not code
                    {},
                    {
                        dataLoaderPool,
                    },
                    makeAST('', ['full_name']),
                ).then(result => {
                    allResults.push(result);
                }),
            ),
        );

        expect(allResults).toMatchObject([
            {
                id: 1,
                code: '4ef6f520-d180-4aee-9517-43214f396609',
                full_name: 'Max Mustermann',
            },
            {
                id: 2,
                code: '9e9c4ee3-d92e-48f2-8235-577806c12534',
                full_name: 'Mister Twister',
            },
            null,
            {
                id: 3,
                code: '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                full_name: 'Sonoya Mizuno',
            },
        ]);

        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );

        expect(importantPersonRepository.find).toHaveBeenCalledTimes(1);
        expect(
            importantPersonRepository.find.mock.calls[0][0].where.id._value,
        ).toEqual([1, 2, 10, 3]);
    });

    it('reference(single): should handle requests with different sets of selected fields', async () => {
        const getPartner = resolvers[0].ImportantPerson.partner;
        expect(getPartner).toBeInstanceOf(Function);

        const dataLoaderPool = new DataLoaderPool();
        const allResults = [];

        await Promise.all([
            getPartner(
                { partner: 1 }, // this "comes" from the database, that is why there is id, not code
                {},
                {
                    dataLoaderPool,
                },
                makeAST('', ['full_name']),
            ).then(result => {
                allResults.push(result);
            }),
            getPartner(
                { partner: 2 }, // this "comes" from the database, that is why there is id, not code
                {},
                {
                    dataLoaderPool,
                },
                makeAST('', ['full_name', 'has_pets', 'tags']),
            ).then(result => {
                allResults.push(result);
            }),
            getPartner(
                { partner: 3 }, // this "comes" from the database, that is why there is id, not code
                {},
                {
                    dataLoaderPool,
                },
                makeAST('', ['full_name']),
            ).then(result => {
                allResults.push(result);
            }),
        ]);

        expect(allResults).toMatchObject([
            {
                id: 1,
                code: '4ef6f520-d180-4aee-9517-43214f396609',
                full_name: 'Max Mustermann',
            },
            {
                id: 3,
                code: '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                full_name: 'Sonoya Mizuno',
            },
            {
                id: 2,
                code: '9e9c4ee3-d92e-48f2-8235-577806c12534',
                full_name: 'Mister Twister',
                tags: ['five', 'two'],
                has_pets: false,
            },
        ]);

        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );

        expect(importantPersonRepository.find).toHaveBeenCalledTimes(2);
        expect(
            importantPersonRepository.find.mock.calls[0][0].where.id._value,
        ).toEqual([1, 3]);
        expect(
            importantPersonRepository.find.mock.calls[1][0].where.id._value,
        ).toEqual([2]);
    });

    it('reference(single): should handle query errors', async () => {
        const importantPersonRepository = connection.getRepositoryByEntityName(
            'important_person',
        );

        importantPersonRepository.find.mockImplementationOnce(() => {
            throw new Error('Woops');
        });

        const getPartner = resolvers[0].ImportantPerson.partner;
        expect(getPartner).toBeInstanceOf(Function);

        const dataLoaderPool = new DataLoaderPool();
        const allResults = [];

        jest.spyOn(global.logger, 'error');
        global.logger.error.mockImplementation(() => {});

        await Promise.all([
            getPartner(
                { partner: 1 }, // this "comes" from the database, that is why there is id, not code
                {},
                {
                    dataLoaderPool,
                },
                makeAST('', ['full_name']),
            ).then(result => {
                allResults.push(result);
            }),
            getPartner(
                { partner: 2 }, // this "comes" from the database, that is why there is id, not code
                {},
                {
                    dataLoaderPool,
                },
                makeAST('', ['full_name', 'has_pets', 'tags']),
            ).then(result => {
                allResults.push(result);
            }),
            getPartner(
                { partner: 3 }, // this "comes" from the database, that is why there is id, not code
                {},
                {
                    dataLoaderPool,
                },
                makeAST('', ['full_name']),
            ).then(result => {
                allResults.push(result);
            }),
        ]);

        expect(allResults).toMatchObject([
            null,
            null,
            {
                id: 2,
                code: '9e9c4ee3-d92e-48f2-8235-577806c12534',
                full_name: 'Mister Twister',
                tags: ['five', 'two'],
                has_pets: false,
            },
        ]);

        expect(global.logger.error).toHaveBeenCalledTimes(1);

        global.logger.error.mockRestore();
    });

    it('reference(multiple): should get referenced data', async () => {
        const petRepository = connection.getRepositoryByEntityName('pet');

        petRepository.queryBuilder.getMany.mockImplementationOnce(() => [
            {
                id: '1',
                code: 'code1',
                nickname: 'Bobik',
            },
        ]);

        const getPets = resolvers[0].ImportantPerson.pets;
        expect(getPets).toBeInstanceOf(Function);

        let result = await getPets(
            { id: 1 }, // this "comes" from the database, that is why there is id, not code
            {
                sort: { nickname: 'ASC', illegal_field: 'DESC' },
                limit: 1,
                offset: 1,
            },
            {},
            makeAST('', ['nickname', 'illegal_field']),
        );

        expect(result).toMatchObject([
            { id: '1', code: 'code1', nickname: 'Bobik' },
        ]);

        const queryBuilder = petRepository.queryBuilder;

        // select
        expect(queryBuilder.select).toHaveBeenCalledTimes(1);
        expect(queryBuilder.select.mock.calls[0][0]).toMatchObject([
            'eq_e_pet.nickname',
            'eq_e_pet.id',
            'eq_e_pet.code',
        ]);

        // order
        expect(queryBuilder.orderBy).toHaveBeenCalledTimes(1);
        expect(queryBuilder.orderBy.mock.calls[0][0]).toMatchObject({
            'eq_e_pet.nickname': 'ASC',
        });

        // limit-offset
        expect(queryBuilder.take).toHaveBeenCalledTimes(1);
        expect(queryBuilder.take.mock.calls[0][0]).toEqual(1);
        expect(queryBuilder.skip).toHaveBeenCalledTimes(1);
        expect(queryBuilder.skip.mock.calls[0][0]).toEqual(1);

        // join relation
        expect(
            petRepository.queryBuilder.innerJoinAndSelect,
        ).toHaveBeenCalledTimes(1);
        const firstCall =
            petRepository.queryBuilder.innerJoinAndSelect.mock.calls[0];
        expect(firstCall[3]).toMatchObject({ referenceValue: 1 });

        // rock-and-roll
        expect(petRepository.queryBuilder.getMany).toHaveBeenCalledTimes(1);
    });
});
