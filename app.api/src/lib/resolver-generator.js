import { getManager, getRepository } from 'typeorm';
import uuid from 'uuid/v4';

import { convertToCamel } from './util';
import Validator from './validator';
import { ENTITY_TYPE_DATE, QUERY_FIND_MAX_PAGE_SIZE } from '../constants';

export default class ResolverGenerator {
    static make({ entities, dbEntities, connection }) {
        return entities.map(entity =>
            ResolverGenerator.makeOne({
                entity,
                entities,
                dbEntities,
                connection,
            }),
        );
    }

    static makeOne({ entity, entities, dbEntities }) {
        const nameCamel = convertToCamel(entity.name);
        const dbEntity = dbEntities[entity.name];

        return {
            // process query - Get and Find
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
                    await this.wrap(async () => {
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

                    result.data = this.convertToPlain(dbItem, entity);

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

                    await this.wrap(async () => {
                        result.data = (await repo.find({
                            // select: {},
                            where: {},
                            order: _.ione(sort) ? sort : {},
                            skip: result.offset,
                            take: result.limit,
                        })).map(item => this.convertToPlain(item, entity));
                    }, result.errors);

                    return result;
                },
            },
            // process mutation - Put and Delete
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
                        await this.wrap(async () => {
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
                            result.data = this.convertToPlain(dbItem, entity);
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
                            await this.wrap(async () => {
                                await repo.delete(repo.getId(item));
                            }, result.errors);
                        }
                    }

                    return result;
                },
            },
            // process reference traversal
            [nameCamel]: this.createReferenceResolvers({
                entity,
                dbEntity,
                entities,
                dbEntities,
            }),
        };
    }

    static createReferenceResolvers({ ...args }) {
        const { entity } = args;
        const resolvers = {};

        // get all references
        const refs = entity.schema
            .map(field =>
                this.getReferenceFieldName(field) !== null ? field : null,
            )
            .filter(x => x);
        if (!_.iane(refs)) {
            return resolvers;
        }

        refs.forEach(field => {
            resolvers[field.name] = this.isMultipleField(field)
                ? this.createReferenceResolverMultiple({ field, ...args })
                : this.createReferenceResolverSingle({ field, ...args });
        });

        return resolvers;
    }

    static createReferenceResolverSingle({ field, entities, dbEntities }) {
        return async (source, args, { dataSources }, state) => {
            const refValue = source[field.name];
            if (typeof refValue === 'undefined' || refValue === null) {
                return null;
            }

            const refEntityName = this.getReferenceFieldName(field);
            const refDBEntity = dbEntities[refEntityName];
            const entity = entities.find(
                entity => entity.name === refEntityName,
            );
            if (!refDBEntity || !entity) {
                throw new Error(
                    `Schema is corrupted. No entity under name ${refEntityName}`,
                );
            }

            const repo = getRepository(refDBEntity);
            const errors = [];
            let dbItem = null;
            await this.wrap(async () => {
                // todo: take "select" into account
                dbItem = await repo.findOne({
                    id: refValue,
                });
            }, errors);

            if (_.iane(errors)) {
                // something is wrong
                return null;
            }

            return this.convertToPlain(dbItem, entity);
        };
    }

    static createReferenceResolverMultiple(field) {
        return async (source, args, { dataSources }, state) => {
            // console.dir('Multiple');
            // console.dir(source); // the parent element
            // console.dir(args);
            return [];
        };
    }

    static getReferenceFieldName(field) {
        if (this.isMultipleField(field) && _.isne(field.type[0])) {
            return field.type[0];
        }

        return _.isne(field.type) ? field.type : null;
    }

    static isMultipleField(field) {
        return _.isArray(field.type);
    }

    static async wrap(fn, errors) {
        try {
            await fn();
        } catch (e) {
            errors.push({
                code: 'internal',
                message: __DEV__ ? e.message : 'Internal error',
            });
            logger.error('Internal error', e);
        }
    }

    static convertToPlain(dbItem, entity) {
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
    }
}
