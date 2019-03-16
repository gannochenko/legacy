import { getManager, getRepository } from 'typeorm';
import uuid from 'uuid/v4';

import { convertToCamel } from './util';
import Validator from './validator';
import { ENTITY_TYPE_DATE, QUERY_FIND_MAX_PAGE_SIZE } from '../constants';

const wrap = async (fn, errors) => {
    try {
        await fn();
    } catch (e) {
        errors.push({
            code: 'internal',
            message: __DEV__ ? e.message : 'Internal error',
        });
        logger.error('Internal error', e);
    }
};

const convertToPlain = (dbItem, entity) => {
    const plain = {};
    entity.schema.forEach(field => {
        if (
            field.name in dbItem &&
            typeof dbItem[field.name] !== 'undefined' &&
            dbItem[field.name] !== null
        ) {
            if (field.type === ENTITY_TYPE_DATE) {
                plain[field.name] = dbItem[field.name].toISOString();
            } else {
                plain[field.name] = dbItem[field.name];
            }
        } else {
            plain[field.name] = null;
        }
    });

    return plain;
};

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
                    const result = {
                        errors: [],
                        data: {},
                    };

                    const { code } = args;
                    const repo = getRepository(dbEntity);

                    let dbItem = null;
                    await wrap(async () => {
                        dbItem = await repo.findOne({
                            code: code.trim(),
                        });
                    }, result.errors);

                    if (!result.errors.length) {
                        if (!dbItem) {
                            result.errors.push({
                                code: 'not_found',
                                message: 'Element not found',
                            });
                        }
                    }

                    result.data = convertToPlain(dbItem, entity);

                    return result;
                },
                [`${nameCamel}Find`]: async (
                    source,
                    args,
                    { dataSources },
                    state,
                ) => {
                    const result = {
                        errors: [],
                        data: {},
                        limit: QUERY_FIND_MAX_PAGE_SIZE,
                        offset: 0,
                    };

                    const { filter, sort, limit, offset } = args;

                    if (
                        typeof offset !== 'undefined' &&
                        offset !== null &&
                        offset > 0
                    ) {
                        result.offset = offset;
                    }

                    if (
                        typeof limit !== 'undefined' &&
                        limit !== null &&
                        limit > 0
                    ) {
                        result.limit =
                            limit > QUERY_FIND_MAX_PAGE_SIZE
                                ? QUERY_FIND_MAX_PAGE_SIZE
                                : limit;
                    }

                    const repo = getRepository(dbEntity);

                    await wrap(async () => {
                        result.data = (await repo.find({
                            // select: {},
                            where: {},
                            order: _.ione(sort) ? sort : {},
                            skip: result.offset,
                            take: result.limit,
                        })).map(item => convertToPlain(item, entity));
                    }, result.errors);

                    // result.data = convertToPlain(dbItem, entity);

                    return result;
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

                    const isNew = !_.isne(code);

                    // no code - auto-generate
                    if (!_.isne(code)) {
                        code = uuid();
                    }
                    data.code = code;

                    // validate
                    const vResult = await Validator.validate(entity, data);
                    if (_.iane(vResult)) {
                        result.errors = _.union(result.errors, vResult);
                    }

                    if (!result.errors.length) {
                        await wrap(async () => {
                            let dbItem = null;
                            if (isNew) {
                                dbItem = repo.create(data);
                            } else {
                                // find id by code
                                dbItem = await repo.findOne({
                                    code: code.trim(),
                                });
                                if (!dbItem) {
                                    result.errors.push({
                                        code: 'not_found',
                                        message: 'Element not found',
                                    });
                                    return;
                                }
                                repo.merge(dbItem, data);
                            }

                            await repo.save(dbItem);

                            result.code = code;
                            result.data = convertToPlain(dbItem, entity);
                        }, result.errors);
                    }

                    return result;
                },
                [`${nameCamel}Delete`]: async (
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

                    let { code } = args;
                    if (!_.isne(code)) {
                        result.errors.push({
                            code: 'illegal_code',
                            message: 'Code is illegal',
                        });
                    }

                    if (!result.errors.length) {
                        const repo = getRepository(dbEntity);

                        const items = await repo.find({ code: code.trim() });
                        if (!_.iane(items)) {
                            result.errors.push({
                                code: 'not_found',
                                message: 'Element not found',
                            });
                        } else {
                            const item = items[0];
                            await wrap(async () => {
                                await repo.delete(repo.getId(item));
                            }, result.errors);
                        }
                    }

                    return result;
                },
            },
        };
    }
}
