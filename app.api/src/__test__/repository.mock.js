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
        findOne: jest.fn(parameters => {
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
        find: jest.fn(parameters => {
            const { where, select, order, skip, take } = parameters;
            const dataPart = _.cloneDeep(data).splice(skip, take);

            return filterKeys(dataPart, select);
        }),
        count: jest.fn(parameters => {
            return data.length;
        }),
    };
};

export const makeConnection = () => {
    const repositories = {};
    return {
        getRepository: jest.fn(entity => {
            if (!repositories[entity]) {
                const name = entity.options.name.replace('eq_e_', '');
                repositories[entity] = makeRepository(name);
            }
            return repositories[entity];
        }),
    };
};

export default makeRepository;
