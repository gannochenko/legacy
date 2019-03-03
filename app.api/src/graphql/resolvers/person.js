export default {
    Query: {
        personGet: async (source, args, { dataSources }, state) => {
            const { id } = args;
            return {
                code: 'sdfhbdfhda',
                full_name: 'Darth Vader',
                medals: 2,
                birth_date:
                    'Sun Mar 03 2019 15:06:03 GMT+0100 (Central European Standard Time)',
                has_pets: true,
            };
        },
        personFind: async (source, args, { dataSources }, state) => {
            const { filter, sort, select, limit, offset } = args;

            return {
                errors: [],
                limit: 1,
                offset: 1,
                data: [
                    {
                        code: 'sdfhbdfhda',
                        full_name: 'Darth Vader',
                        medals: 2,
                        birth_date:
                            'Sun Mar 03 2019 15:06:03 GMT+0100 (Central European Standard Time)',
                        has_pets: true,
                    },
                ],
            };
        },
    },
    Mutation: {
        personPut: async (source, args, { dataSources }, state) => {
            const { code, data } = args;
            console.dir('PUT!');
            return {
                errors: [],
                code: 'asdfasdfds',
                data: {
                    code: 'sdfhbdfhda',
                    full_name: 'Darth Vader',
                    medals: 2,
                    birth_date:
                        'Sun Mar 03 2019 15:06:03 GMT+0100 (Central European Standard Time)',
                    has_pets: true,
                },
            };
        },
        personDelete: async (source, args, { dataSources }, state) => {
            const { code } = args;
            console.dir('DELETE');
            return {
                errors: [],
                code: 'asdfasdfds',
                data: {
                    code: 'sdfhbdfhda',
                    full_name: 'Darth Vader',
                    medals: 2,
                    birth_date:
                        'Sun Mar 03 2019 15:06:03 GMT+0100 (Central European Standard Time)',
                    has_pets: true,
                },
            };
        },
    },
};
