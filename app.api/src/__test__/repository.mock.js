import mockData from './data.mock';

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

export const makeRepository = entityName => {
    const data = _.cloneDeep(mockData[entityName]);

    const queryBuilder = {
        delete: jest.fn(() => queryBuilder),
        from: () => queryBuilder,
        where: jest.fn(() => queryBuilder),
        insert: jest.fn(() => queryBuilder),
        into: () => queryBuilder,
        values: jest.fn(() => queryBuilder),
        execute: jest.fn(() => {}),
    };

    return {
        findOne: jest.fn(async (parameters = {}) => {
            const { where = {}, select = [] } = parameters;

            let result = null;
            if (where.code) {
                result = data.find(item => item.code === where.code);
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

            if ('code' in where && '_value' in where.code) {
                dataPart = dataPart.filter(item =>
                    where.code._value.includes(item.code),
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
            id: 10,
            ...data,
        })),
        createQueryBuilder: () => queryBuilder,
        queryBuilder,
    };
};

export const makeConnection = () => {
    const repositories = {};

    const getRepository = jest.fn(entity => {
        const name = entity.options.name.replace('eq_e_', '');
        if (!repositories[name]) {
            repositories[name] = makeRepository(name);
        }
        return repositories[name];
    });

    return {
        getCurrentRepositories: () => repositories,
        getRepository,
        getRepositoryByEntityName: name => {
            return getRepository({ options: { name } });
        },
        cleanup: () => {
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
        },
    };
};

export const data = mockData;
