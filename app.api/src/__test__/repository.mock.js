import mockData from './data.mock';

const makeRepository = entityName => {
    const data = mockData[entityName];

    const repository = {
        findOne: jest.fn(parameters => {
            const { where, select } = parameters;

            let result = null;
            if (where.code) {
                result = data.find(item => item.code === where.code);
            }

            if (result) {
                const keyDiff = _.intersection(Object.keys(result), select);
                const newResult = {};
                keyDiff.forEach(fieldName => {
                    newResult[fieldName] = result[fieldName];
                });
                result = newResult;
            }

            return result;
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
    };
};

export default makeRepository;
