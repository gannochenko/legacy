import { getManager, getRepository } from 'typeorm';
import uuid from 'uuid/v4';

import { convertToCamel } from './util';
import Validator from './validator';

export default class ResolverGenerator {
    static makeOne({ entity, dbEntity }) {
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
                    const result = {
                        errors: [],
                        code: null,
                        data: {},
                    };

                    let { code, data } = args;
                    const repo = getRepository(dbEntity);

                    // no code - auto-generate
                    if (!code) {
                        code = uuid();
                    }
                    data.code = code;

                    // validate

                    const item = await repo.save(Object.assign({}, data));

                    // convert to plain
                    const plain = {};
                    entity.schema.forEach(field => {
                        plain[field.name] = item[field.name] || null;
                    });

                    result.code = item.code;
                    result.data = plain;

                    return result;
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
