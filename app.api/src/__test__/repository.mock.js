import mockData from './data.mock';

const limitKeySet = (result, select) => {
    return result.map(item => {
        const keyDiff = _.intersection(Object.keys(item), select);
        const newItem = {};
        keyDiff.forEach(fieldName => {
            newItem[fieldName] = item[fieldName];
        });
        return newItem;
    });
};

const makeRepository = entityName => {
    const data = _.cloneDeep(mockData[entityName]);

    const repository = {
        findOne: jest.fn(parameters => {
            const { where, select } = parameters;

            let result = null;
            if (where.code) {
                result = data.find(item => item.code === where.code);
            }

            if (result) {
                result = limitKeySet([result], select)[0];
            }

            return result;
        }),
        find: jest.fn(parameters => {
            const { where, select, order, skip, take } = parameters;
            const dataPart = _.cloneDeep(data).splice(skip, take);

            return limitKeySet(dataPart, select);
        }),
        count: jest.fn(parameters => {
            return data.length;
        }),
    };
    const connection = {
        getRepository: jest.fn(() => {
            return repository;
        }),
    };

    return {
        repository,
        connection,
        data,
    };
};

export default makeRepository;
