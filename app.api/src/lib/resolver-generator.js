import { convertToCamel } from '../lib/util';
import SchemaGenerator from './schema-generator';

export default class ResolverGenerator {
    static make(entity) {
        const nameCamel = convertToCamel(entity.name);

        return {
            Query: {
                [`${nameCamel}Get`]: async (
                    source,
                    args,
                    { dataSources },
                    state,
                ) => {
                    const { code } = args;
                    return {
                        code: 'sdfhbdfhda',
                        full_name: 'Darth Vader',
                        medals: 2,
                        birth_date:
                            'Sun Mar 03 2019 15:06:03 GMT+0100 (Central European Standard Time)',
                        has_pets: true,
                    };
                },
                [`${nameCamel}Find`]: async (
                    source,
                    args,
                    { dataSources },
                    state,
                ) => {
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
                [`${nameCamel}Put`]: async (
                    source,
                    args,
                    { dataSources },
                    state,
                ) => {
                    const { code, data } = args;

                    const dbEntity = SchemaGenerator.make(entity);
                    console.dir(dbEntity);

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
                [`${nameCamel}Delete`]: async (
                    source,
                    args,
                    { dataSources },
                    state,
                ) => {
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
    }
}
