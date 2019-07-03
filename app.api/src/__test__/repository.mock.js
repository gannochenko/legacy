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

    return {
        findOne: jest.fn(async (parameters = {}) => {
            const { where, select } = parameters;

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
            const dataPart = _.cloneDeep(data).splice(skip, take);

            return filterKeys(dataPart, select);
        }),
        count: jest.fn(async (parameters = {}) => {
            return data.length;
        }),
        create: jest.fn(data => data),
        merge: jest.fn(),
        save: jest.fn(data => ({
            id: 10,
            ...data,
        })),
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
        getRepository,
        getRepositoryByEntityName: name => {
            return getRepository({ options: { name } });
        },
    };
};

export const data = mockData;
