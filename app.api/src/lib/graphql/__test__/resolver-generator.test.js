/**
 * https://github.com/sapegin/jest-cheat-sheet
 * https://jestjs.io/docs/en/mock-function-api.html
 */

import uuid from 'uuid/v4';
import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    ENTITY_ID_FIELD_LENGTH,
    Schema,
} from '@project-minimum/core';
import ResolverGenerator from '../resolver-generator';
import DatabaseEntityManager from '../../database/entity-manager';
import schemaJSON from '../../../__test__/schema';
import { makeConnection } from '../../../__test__/repository.mock';
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
        connection.mockClear();
    });

    describe('get()', () => {
        it('should produce the resolver', async () => {
            expect(resolvers[0].Query.ImportantPersonGet).toBeInstanceOf(
                Function,
            );
        });

        it(`should report ${ENTITY_ID_FIELD_NAME} missing`, async () => {
            const get = resolvers[0].Query.ImportantPersonGet;

            // call with no parameters
            let result = await get({}, {});
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].code).toEqual(
                `${ENTITY_ID_FIELD_NAME}_missing`,
            );
        });

        it('should report not found', async () => {
            const get = resolvers[0].Query.ImportantPersonGet;

            let result = await get(
                {},
                { [ENTITY_ID_FIELD_NAME]: 'does_not_exist' },
            );
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].code).toEqual('not_found');
            expect(repository.findOne.mock.calls[0][0]).toMatchObject({
                where: { [ENTITY_ID_FIELD_NAME]: 'does_not_exist' },
                select: [ENTITY_PK_FIELD_NAME, ENTITY_ID_FIELD_NAME],
            });
        });

        it('should return effective data', async () => {
            const get = resolvers[0].Query.ImportantPersonGet;

            let result = await get(
                {},
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                },
                null,
                {},
            );
            expect(result.errors).toHaveLength(0);
            expect(result.data).toMatchObject({
                [ENTITY_ID_FIELD_NAME]: '4ef6f520-d180-4aee-9517-43214f396609',
                [ENTITY_PK_FIELD_NAME]: 1,
            });
        });

        it('should limit the amount of selected fields', async () => {
            const get = resolvers[0].Query.ImportantPersonGet;

            let result = await get(
                {},
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                },
                null,
                makeAST('data', ['full_name', 'has_pets']),
            );
            expect(result.data).toMatchObject({
                [ENTITY_ID_FIELD_NAME]: '4ef6f520-d180-4aee-9517-43214f396609',
                full_name: 'Max Mustermann',
                has_pets: true,
                [ENTITY_PK_FIELD_NAME]: 1,
            });
        });
    });

    describe('find()', () => {
        it('should produce the resolver', async () => {
            expect(resolvers[0].Query.ImportantPersonFind).toBeInstanceOf(
                Function,
            );
        });

        it('should return effective data', async () => {
            const find = resolvers[0].Query.ImportantPersonFind;

            let result = await find({}, {}, null, {});
            expect(result).toMatchObject({
                data: [
                    {
                        [ENTITY_ID_FIELD_NAME]:
                            '4ef6f520-d180-4aee-9517-43214f396609',
                        [ENTITY_PK_FIELD_NAME]: 1,
                    },
                    {
                        [ENTITY_ID_FIELD_NAME]:
                            '9e9c4ee3-d92e-48f2-8235-577806c12534',
                        [ENTITY_PK_FIELD_NAME]: 2,
                    },
                    {
                        [ENTITY_ID_FIELD_NAME]:
                            '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                        [ENTITY_PK_FIELD_NAME]: 3,
                    },
                ],
                errors: [],
                limit: 50,
                offset: 0,
            });
        });

        it('should process limit and offset', async () => {
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
            expect(result.data[0][ENTITY_ID_FIELD_NAME]).toEqual(
                '9e9c4ee3-d92e-48f2-8235-577806c12534',
            );
        });

        it('should process page and pageCount', async () => {
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
            expect(result.data[0][ENTITY_ID_FIELD_NAME]).toEqual(
                '9e9c4ee3-d92e-48f2-8235-577806c12534',
            );
        });

        it('should process sort order', async () => {
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

        // it('should process filter [todo]', async () => {
        //     // todo
        // });

        it('should control the maximum amount of items to return', async () => {
            const find = resolvers[0].Query.ImportantPersonFind;

            let result = await find({}, { limit: 1000 }, null, {});

            expect(result.data).toHaveLength(0);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0]).toMatchObject({
                code: 'limit_too_high',
                message: 'Limit too high',
            });
        });

        it('should limit the amount of selected fields', async () => {
            const find = resolvers[0].Query.ImportantPersonFind;

            let result = await find(
                {},
                {},
                null,
                makeAST('data', ['full_name', 'has_pets']),
            );
            expect(result.data).toMatchObject([
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                    full_name: 'Max Mustermann',
                    has_pets: true,
                    [ENTITY_PK_FIELD_NAME]: 1,
                },
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '9e9c4ee3-d92e-48f2-8235-577806c12534',
                    full_name: 'Mister Twister',
                    has_pets: false,
                    [ENTITY_PK_FIELD_NAME]: 2,
                },
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                    full_name: 'Sonoya Mizuno',
                    has_pets: false,
                    [ENTITY_PK_FIELD_NAME]: 3,
                },
            ]);
        });

        // it('should return only codes if no select fields specified [todo]', async () => {
        //     // todo
        // });

        it('should return count by filter', async () => {
            const find = resolvers[0].Query.ImportantPersonFind;

            let result = await find({}, {}, null, makeAST('count', []));

            expect(result.errors).toHaveLength(0);
            expect(result.count).toEqual(3);
        });

        it('should accept filter or search, but not both', async () => {
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
                message:
                    'You can not set both search and filter at the same time',
            });
        });
    });

    describe('put()', () => {
        it('should create a new item', async () => {
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
            expect(result[ENTITY_ID_FIELD_NAME]).toHaveLength(
                ENTITY_ID_FIELD_LENGTH,
            ); // assigns a new code
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

        it('should update an existing item', async () => {
            const put = resolvers[0].Mutation.ImportantPersonPut;

            let result = await put(
                {},
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                    data: {
                        full_name: 'hello!',
                    },
                },
                null,
                {},
            );

            expect(result.errors).toHaveLength(0);
            expect(result[ENTITY_ID_FIELD_NAME]).toEqual(
                '4ef6f520-d180-4aee-9517-43214f396609',
            );
            expect(result.data).toMatchObject({
                full_name: 'hello!',
                [ENTITY_PK_FIELD_NAME]: 1,
            });

            const importantPersonRepository = connection.getRepositoryByEntityName(
                'important_person',
            );

            // check that findOne was called
            expect(importantPersonRepository.findOne).toHaveBeenCalledTimes(1);
            expect(
                importantPersonRepository.findOne.mock.calls[0][0],
            ).toMatchObject({
                where: {
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                },
                select: [ENTITY_PK_FIELD_NAME],
            });

            // check that create was not called
            expect(importantPersonRepository.create).toHaveBeenCalledTimes(0);

            // check that merge was called
            expect(importantPersonRepository.merge).toHaveBeenCalledTimes(1);

            // check that save was called
            const saveCall = importantPersonRepository.save.mock.calls[0];
            expect(saveCall[0]).toMatchObject({
                [ENTITY_PK_FIELD_NAME]: 1,
                full_name: 'hello!',
            });
        });

        it('should not allow to set the code from the data argument', async () => {
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
            expect(result[ENTITY_ID_FIELD_NAME]).not.toEqual(
                '4ef6f520-d180-4aee-9517-43214f396609',
            );
        });

        it('should not accept invalid data for saving', async () => {
            const put = resolvers[0].Mutation.ImportantPersonPut;

            let result = await put(
                {},
                {
                    data: {},
                },
                null,
                {},
            );

            expect(result[ENTITY_ID_FIELD_NAME]).toEqual(null);
            expect(result.data).toEqual({});
            expect(result.errors).toMatchObject([
                {
                    message: 'Full name is required',
                    code: 'validation',
                    reference: 'full_name',
                },
            ]);
        });

        // it('should return an item only when it is asked [todo]', async () => {
        //     // todo
        // });

        it('should manage relations', async () => {
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
            expect(codeToIdCall[0].where[ENTITY_ID_FIELD_NAME]._value).toEqual([
                '4ef6f520-d180-4aee-9517-43214f396609',
            ]);
            expect(codeToIdCall[0].select).toEqual([
                ENTITY_PK_FIELD_NAME,
                ENTITY_ID_FIELD_NAME,
            ]);

            // now for "pet" entity
            const petRepository = connection.getRepositoryByEntityName('pet');

            // maps codes to ids on pet repo (because of that "pets" field set)
            codeToIdCall = petRepository.find.mock.calls[0];
            expect(codeToIdCall).toBeDefined();
            expect(codeToIdCall[0].where[ENTITY_ID_FIELD_NAME]._value).toEqual([
                '01f6f520-d180-4aee-9517-43214f396609',
                '02f6f520-d180-4aee-9517-43214f396609',
            ]);
            expect(codeToIdCall[0].select).toEqual([
                ENTITY_PK_FIELD_NAME,
                ENTITY_ID_FIELD_NAME,
            ]);

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

        it('should not touch any multiple relations if there were no changes', async () => {
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

        it('should return error when trying to update non-existing item', async () => {
            const put = resolvers[0].Mutation.ImportantPersonPut;

            let result = await put(
                {},
                {
                    [ENTITY_ID_FIELD_NAME]: uuid(),
                    data: {
                        full_name: 'hello!',
                    },
                },
                null,
                {},
            );

            expect(result[ENTITY_ID_FIELD_NAME]).toEqual(null);
            expect(result.data).toEqual({});
            expect(result.errors).toMatchObject([
                { code: 'not_found', message: 'Element not found' },
            ]);
        });
    });

    describe('delete()', () => {
        it('should delete an element and all its multiple references', async () => {
            const mutationDelete = resolvers[0].Mutation.ImportantPersonDelete;

            let result = await mutationDelete(
                {},
                {
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                },
                null,
                {},
            );

            expect(result.errors).toHaveLength(0);
            expect(result.id).toEqual('4ef6f520-d180-4aee-9517-43214f396609');

            // the item itself was dropped
            const importantPersonRepository = connection.getRepositoryByEntityName(
                'important_person',
            );
            expect(importantPersonRepository.delete).toHaveBeenCalledTimes(1);
            expect(importantPersonRepository.delete.mock.calls[0][0]).toEqual(
                1,
            );

            // multiple relations dropped
            const petsRepository = connection.getRepositoryByEntityName(
                'eq_ref_ba4ed80327568d335915e4452eb0703a',
            );
            const petsRepositoryQueryBuilder = petsRepository.queryBuilder;

            expect(petsRepositoryQueryBuilder.delete).toHaveBeenCalledTimes(1);
            expect(petsRepositoryQueryBuilder.execute).toHaveBeenCalledTimes(1);
        });

        it('should return error if the code is not set', async () => {
            const mutationDelete = resolvers[0].Mutation.ImportantPersonDelete;

            let result = await mutationDelete({}, {}, null, {});

            expect(result.errors).toMatchObject([
                { code: 'illegal_id', message: 'Id is illegal' },
            ]);
        });

        it('should return error if the element is originally missing', async () => {
            const mutationDelete = resolvers[0].Mutation.ImportantPersonDelete;

            let result = await mutationDelete(
                {},
                {
                    [ENTITY_ID_FIELD_NAME]: 'missing-item',
                },
                null,
                {},
            );

            expect(result.errors).toMatchObject([
                { code: 'not_found', message: 'Element not found' },
            ]);
        });
    });

    describe('reference', () => {
        describe('single', () => {
            it('should get referenced data', async () => {
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
                    [ENTITY_PK_FIELD_NAME]: 1,
                    [ENTITY_ID_FIELD_NAME]:
                        '4ef6f520-d180-4aee-9517-43214f396609',
                    full_name: 'Max Mustermann',
                });
            });

            it('should utilize bulk load', async () => {
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
                        [ENTITY_PK_FIELD_NAME]: 1,
                        [ENTITY_ID_FIELD_NAME]:
                            '4ef6f520-d180-4aee-9517-43214f396609',
                        full_name: 'Max Mustermann',
                    },
                    {
                        [ENTITY_PK_FIELD_NAME]: 2,
                        [ENTITY_ID_FIELD_NAME]:
                            '9e9c4ee3-d92e-48f2-8235-577806c12534',
                        full_name: 'Mister Twister',
                    },
                    null,
                    {
                        [ENTITY_PK_FIELD_NAME]: 3,
                        [ENTITY_ID_FIELD_NAME]:
                            '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                        full_name: 'Sonoya Mizuno',
                    },
                ]);

                const importantPersonRepository = connection.getRepositoryByEntityName(
                    'important_person',
                );

                expect(importantPersonRepository.find).toHaveBeenCalledTimes(1);
                expect(
                    importantPersonRepository.find.mock.calls[0][0].where[
                        ENTITY_PK_FIELD_NAME
                    ]._value,
                ).toEqual([1, 2, 10, 3]);
            });

            it('should handle requests with different sets of selected fields', async () => {
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
                        [ENTITY_PK_FIELD_NAME]: 1,
                        [ENTITY_ID_FIELD_NAME]:
                            '4ef6f520-d180-4aee-9517-43214f396609',
                        full_name: 'Max Mustermann',
                    },
                    {
                        [ENTITY_PK_FIELD_NAME]: 3,
                        [ENTITY_ID_FIELD_NAME]:
                            '2a98f71a-a3f6-43a1-8196-9a845ba8a54f',
                        full_name: 'Sonoya Mizuno',
                    },
                    {
                        [ENTITY_PK_FIELD_NAME]: 2,
                        [ENTITY_ID_FIELD_NAME]:
                            '9e9c4ee3-d92e-48f2-8235-577806c12534',
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
                    importantPersonRepository.find.mock.calls[0][0].where[
                        ENTITY_PK_FIELD_NAME
                    ]._value,
                ).toEqual([1, 3]);
                expect(
                    importantPersonRepository.find.mock.calls[1][0].where[
                        ENTITY_PK_FIELD_NAME
                    ]._value,
                ).toEqual([2]);
            });

            it('should handle query errors', async () => {
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
                        [ENTITY_PK_FIELD_NAME]: 2,
                        [ENTITY_ID_FIELD_NAME]:
                            '9e9c4ee3-d92e-48f2-8235-577806c12534',
                        full_name: 'Mister Twister',
                        tags: ['five', 'two'],
                        has_pets: false,
                    },
                ]);

                expect(global.logger.error).toHaveBeenCalledTimes(1);

                global.logger.error.mockRestore();
            });
        });

        describe('multiple', () => {
            it('should get referenced data', async () => {
                const petRepository = connection.getRepositoryByEntityName(
                    'pet',
                );

                petRepository.queryBuilder.getMany.mockImplementationOnce(
                    () => [
                        {
                            [ENTITY_PK_FIELD_NAME]: '1',
                            [ENTITY_ID_FIELD_NAME]: 'code1',
                            nickname: 'Bobik',
                        },
                    ],
                );

                const getPets = resolvers[0].ImportantPerson.pets;
                expect(getPets).toBeInstanceOf(Function);

                let result = await getPets(
                    { [ENTITY_PK_FIELD_NAME]: 1 }, // this "comes" from the database, that is why there is id, not code
                    {
                        sort: { nickname: 'ASC', illegal_field: 'DESC' },
                        limit: 1,
                        offset: 1,
                    },
                    {},
                    makeAST('', ['nickname', 'illegal_field']),
                );

                expect(result).toMatchObject([
                    {
                        [ENTITY_PK_FIELD_NAME]: '1',
                        [ENTITY_ID_FIELD_NAME]: 'code1',
                        nickname: 'Bobik',
                    },
                ]);

                const queryBuilder = petRepository.queryBuilder;

                // select
                expect(queryBuilder.select).toHaveBeenCalledTimes(1);
                expect(queryBuilder.select.mock.calls[0][0]).toMatchObject([
                    'eq_e_pet.nickname',
                    `eq_e_pet.${ENTITY_PK_FIELD_NAME}`,
                    `eq_e_pet.${ENTITY_ID_FIELD_NAME}`,
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
                expect(
                    petRepository.queryBuilder.getMany,
                ).toHaveBeenCalledTimes(1);
            });
        });
    });
});
