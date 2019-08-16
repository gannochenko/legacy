import mockData from './data.mock';
import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    DB_ENTITY_TABLE_PREFIX,
} from 'project-minimum-core';

const filterKeys = (result, select) => {
    return result.map(item => {
        const keyDiff = _.intersection(Object.keys(item), select);
        const newItem = {};
        keyDiff.forEach(fieldName => {
            newItem[fieldName] = item[fieldName];
        });
        return newItem;
    });
};

// query builder makes raw queries from JS declarations
export const makeQueryBuilder = () => {
    const queryBuilder = {
        delete: jest.fn(() => queryBuilder),
        from: () => queryBuilder,
        where: jest.fn(() => queryBuilder),
        insert: jest.fn(() => queryBuilder),
        into: () => queryBuilder,
        values: jest.fn(() => queryBuilder),
        execute: jest.fn(() => {}),
        select: jest.fn(() => queryBuilder),
        take: jest.fn(() => queryBuilder),
        skip: jest.fn(() => queryBuilder),
        orderBy: jest.fn(() => queryBuilder),
        innerJoinAndSelect: jest.fn(() => queryBuilder),
        getMany: jest.fn(() => []),
    };

    return queryBuilder;
};

export const makeQueryRunner = () => {
    return {
        createTable: jest.fn().mockReturnThis(),
    };
};

export const makeRepository = entityName => {
    const data = _.cloneDeep(mockData[entityName]);
    const queryBuilder = makeQueryBuilder();

    return {
        findOne: jest.fn(async (parameters = {}) => {
            const { where = {}, select = [] } = parameters;

            let result = null;
            if (where[ENTITY_ID_FIELD_NAME]) {
                result = data.find(
                    item =>
                        item[ENTITY_ID_FIELD_NAME] ===
                        where[ENTITY_ID_FIELD_NAME],
                );
            }

            if (result) {
                result = filterKeys([result], select)[0];
            }

            return result;
        }),
        find: jest.fn(async (parameters = {}) => {
            const { where, select, order, skip, take } = parameters;
            let dataPart = _.cloneDeep(data);
            if (skip !== undefined && take !== undefined) {
                dataPart = dataPart.splice(skip, take);
            }

            if (
                ENTITY_ID_FIELD_NAME in where &&
                '_value' in where[ENTITY_ID_FIELD_NAME]
            ) {
                dataPart = dataPart.filter(item =>
                    where[ENTITY_ID_FIELD_NAME]._value.includes(
                        item[ENTITY_ID_FIELD_NAME],
                    ),
                );
            }

            if (
                ENTITY_PK_FIELD_NAME in where &&
                '_value' in where[ENTITY_PK_FIELD_NAME]
            ) {
                dataPart = dataPart.filter(item =>
                    where[ENTITY_PK_FIELD_NAME]._value.includes(
                        item[ENTITY_PK_FIELD_NAME],
                    ),
                );
            }

            return filterKeys(dataPart, select);
        }),
        count: jest.fn(async (parameters = {}) => {
            return data.length;
        }),
        create: jest.fn(data => data),
        merge: jest.fn((item, data) => {
            Object.assign(item, data);
        }),
        save: jest.fn(data => ({
            [ENTITY_PK_FIELD_NAME]: 10,
            ...data,
        })),
        getId: jest.fn(item => item[ENTITY_PK_FIELD_NAME]),
        delete: jest.fn(() => {}),
        createQueryBuilder: () => queryBuilder,
        queryBuilder,
    };
};

export const makeConnection = () => {
    const repositories = {};
    let queryRunner = null;

    const getRepository = jest.fn(entity => {
        const name = entity.options.name.replace(DB_ENTITY_TABLE_PREFIX, '');
        if (!repositories[name]) {
            repositories[name] = makeRepository(name);
        }
        return repositories[name];
    });

    return {
        getCurrentRepositories: () => repositories,
        getRepository,
        createQueryRunner: () => {
            if (!queryRunner) {
                queryRunner = makeQueryRunner();
            }

            return queryRunner;
        },
        getRepositoryByEntityName: name => {
            return getRepository({ options: { name } });
        },
        mockClear: () => {
            Object.keys(repositories).forEach(entityName => {
                const repository = repositories[entityName];
                Object.keys(repository).forEach(memberKey => {
                    const member = repository[memberKey];
                    if (typeof member === 'function' && 'mockReset' in member) {
                        member.mockClear();
                    } else {
                        Object.keys(member).forEach(subKey => {
                            const subMember = member[subKey];
                            if (
                                typeof subMember === 'function' &&
                                'mockReset' in subMember
                            ) {
                                subMember.mockClear();
                            }
                        });
                    }
                });
            });

            if (queryRunner) {
                Object.keys(queryRunner).forEach(memberKey => {
                    const member = queryRunner[memberKey];
                    if (typeof member === 'function' && 'mockReset' in member) {
                        member.mockClear();
                    }
                });
            }
        },
    };
};

export const data = mockData;
