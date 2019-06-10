import { getRepository, In, Like } from 'typeorm';
import uuid from 'uuid/v4';
import { getRefName } from '../entity-util';
import { getSelectionAt } from '../ast';

import Validator from '../validator';
import { TYPE_DATETIME, QUERY_FIND_MAX_PAGE_SIZE } from 'project-minimum-core';

export default class ResolverGenerator {
    static async make(schema, databaseEntityManager, connection) {
        return Object.values(await schema.getSchema()).map(entity =>
            this.makeForEntity(
                entity,
                schema,
                databaseEntityManager,
                connection,
            ),
        );
    }

    static makeGetForEntity(entity, schema, databaseEntityManager, connection) {
        const databaseEntity = databaseEntityManager.getByDefinition(entity);

        return async (source, args) => {
            const result = {
                errors: [],
                data: null,
            };

            const { code } = args;
            if (!_.isne(code)) {
                result.errors.push({
                    code: 'code_missing',
                    message: 'Code is missing in the request',
                });
                return result;
            }

            const repository = connection.getRepository(databaseEntity);

            let dbItem = null;
            await this.wrap(async () => {
                dbItem = await repository.findOne({
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

            if (dbItem) {
                result.data = this.convertToPlain(dbItem, entity);
            }

            return result;
        };
    }

    /**
     *
     * @param entity
     * @param schema
     * @param databaseEntityManager
     * @param connection
     * @returns {*}
     */
    static makeForEntity(entity, schema, databaseEntityManager, connection) {
        const name = entity.getCamelName();
        return {
            // process query - Get and Find
            Query: {
                [`${name}Get`]: this.makeGetForEntity(
                    entity,
                    schema,
                    databaseEntityManager,
                    connection,
                ),
                [`${name}Find`]: async (source, args, { requestId }, info) => {
                    const result = {
                        errors: [],
                        data: [],
                        limit: QUERY_FIND_MAX_PAGE_SIZE,
                        offset: 0,
                    };

                    let {
                        filter,
                        search,
                        sort,
                        limit,
                        offset,
                        page,
                        pageSize,
                    } = args;

                    if (filter !== undefined && search !== undefined) {
                        result.errors.push({
                            code: 'search_filter_conflict',
                            message:
                                'You can not set both search and filter at the same time',
                        });

                        return result;
                    }

                    // page/pageSize pair has higher priority
                    if (typeof pageSize !== 'undefined') {
                        limit = pageSize;
                    }

                    if (typeof limit === 'undefined') {
                        limit = QUERY_FIND_MAX_PAGE_SIZE;
                    } else if (limit > QUERY_FIND_MAX_PAGE_SIZE) {
                        result.errors.push({
                            code: 'limit_too_high',
                            message: 'Limit too high',
                        });

                        return result;
                    }

                    if (typeof page !== 'undefined') {
                        offset = (page - 1) * limit;
                    }

                    result.limit = limit;
                    result.offset = offset;

                    // todo: use connection here
                    const repo = getRepository(dbEntity);

                    await this.wrap(async () => {
                        result.data = (await repo.find({
                            // select: {},
                            where: this.makeWhereFind(filter, search),
                            order: _.ione(sort) ? sort : {},
                            skip: result.offset,
                            take: result.limit,
                        })).map(item => this.convertToPlain(item, entity));
                    }, result.errors);

                    if (!!getSelectionAt(info, 'count')) {
                        // count asked
                        await this.wrap(async () => {
                            result.count = await repo.count({
                                where: {},
                            });
                        }, result.errors);
                    }

                    return result;
                },
            },
            // process mutation - Put and Delete
            Mutation: {
                [`${name}Put`]: async (
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
                    // todo: use connection here
                    const repo = getRepository(dbEntity);

                    const isNew = !_.isne(code);

                    delete data.code; // there is no way to set the code manually
                    // no code - auto-generate
                    if (!_.isne(code)) {
                        code = uuid();
                        data.code = code;
                    }

                    // validate
                    const vResult = await Validator.validate(entity, data);
                    if (_.iane(vResult)) {
                        result.errors = _.union(result.errors, vResult);
                    }

                    if (!result.errors.length) {
                        await this.wrap(async () => {
                            // todo: run Entity.prepareData() here
                            // need to replace single references from code to id
                            // todo: add this to the server side of Entity.prepareData()
                            // get all single references
                            const refs = entity.schema
                                .map(field =>
                                    !schemaProvider.isMultipleField(field) &&
                                    _.isne(
                                        schemaProvider.getReferenceFieldName(
                                            field,
                                        ),
                                    )
                                        ? field
                                        : null,
                                )
                                .filter(x => x);

                            // todo: that needs to be optimized: batch this
                            for (let i = 0; i < refs.length; i++) {
                                const rName = refs[i].name;
                                if (rName in data) {
                                    if (
                                        data[rName] === undefined ||
                                        data[rName] === null
                                    ) {
                                        data[rName] = null;
                                        continue;
                                    }

                                    data[rName] = data[rName].toString().trim();
                                    if (!data[rName].length) {
                                        data[rName] = null;
                                        continue;
                                    }

                                    const refEntityName = refs[i].type;
                                    // need to replace code with id
                                    const refDBEntity = await entityManager.getByName(
                                        refEntityName,
                                    );
                                    const repo = connection.getRepository(
                                        refDBEntity,
                                    );
                                    const refItem = await repo.findOne({
                                        where: { code: data[rName] },
                                        select: ['id'],
                                    });
                                    if (refItem) {
                                        data[rName] = refItem.id;
                                    } else {
                                        data[rName] = null;
                                    }
                                }
                            }

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
                            await this.managerMultipleReferences(
                                entity,
                                dbItem.id,
                                data,
                                schemaProvider,
                                entityManager,
                            );

                            result.code = code;
                            result.data = this.convertToPlain(dbItem, entity);
                        }, result.errors);
                    }

                    return result;
                },
                [`${name}Delete`]: async (
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
                        // todo: use connection here
                        const repo = getRepository(dbEntity);

                        const items = await repo.find({ code: code.trim() });
                        if (!_.iane(items)) {
                            result.errors.push({
                                code: 'not_found',
                                message: 'Element not found',
                            });
                        } else {
                            const item = items[0];
                            const id = repo.getId(item);
                            await this.wrap(async () => {
                                await repo.delete(id);
                            }, result.errors);

                            // drop refs
                            // get all multiple references
                            const refs = entity.schema
                                .map(field =>
                                    schemaProvider.isMultipleField(field) &&
                                    _.isne(
                                        schemaProvider.getReferenceFieldName(
                                            field,
                                        ),
                                    )
                                        ? field
                                        : null,
                                )
                                .filter(x => x);

                            // check if something is in data
                            for (let i = 0; i < refs.length; i++) {
                                const field = refs[i];

                                const refTableEntityName = getRefName(
                                    entity,
                                    field,
                                );
                                const refTableDBEntity = await entityManager.getByName(
                                    refTableEntityName,
                                );

                                // todo: use connection here
                                const rrepo = getRepository(refTableDBEntity);
                                const rqb = rrepo.createQueryBuilder(
                                    refTableDBEntity,
                                );

                                // delete all
                                await rqb
                                    .delete()
                                    .from(refTableDBEntity)
                                    .where('self = :id', { id })
                                    .execute();
                            }
                        }
                    }

                    return result;
                },
            },
            //// process reference traversal
            // [name]: this.createReferenceResolvers({
            //     entity,
            //     dbEntity,
            //     entityManager,
            //     schemaProvider,
            //     connection,
            // }),
        };
    }

    static async managerMultipleReferences(
        entity,
        id,
        data,
        schemaProvider,
        entityManager,
    ) {
        // get all multiple references
        const refs = entity.schema
            .map(field =>
                schemaProvider.isMultipleField(field) &&
                _.isne(schemaProvider.getReferenceFieldName(field))
                    ? field
                    : null,
            )
            .filter(x => x);

        // check if something is in data
        for (let i = 0; i < refs.length; i++) {
            const field = refs[i];
            if (field.name in data) {
                const refTableEntityName = getRefName(entity, field);
                const refTableDBEntity = await entityManager.getByName(
                    refTableEntityName,
                );

                const rrepo = getRepository(refTableDBEntity);
                const rqb = rrepo.createQueryBuilder(refTableDBEntity);

                const values = data[field.name];
                let ids = [];

                if (_.iane(values)) {
                    const refEntityName = schemaProvider.getReferenceFieldName(
                        field,
                    );
                    const refDBEntity = await entityManager.getByName(
                        refEntityName,
                    );
                    // todo: use connection here
                    const repo = getRepository(refDBEntity);
                    const qb = repo.createQueryBuilder(refEntityName);

                    // todo: optimise: get code and id only!
                    ids = (await qb
                        .where({
                            code: In(values),
                        })
                        .getMany()).map(item => item.id);
                }

                // delete all
                await rqb
                    .delete()
                    .from(refTableDBEntity)
                    .where('self = :id', { id })
                    .execute();

                // and re-create
                if (_.iane(ids)) {
                    await rqb
                        .insert()
                        .into(refTableDBEntity)
                        .values(
                            ids.map(relId => ({
                                self: id,
                                rel: relId,
                            })),
                        )
                        .execute();
                }
            }
        }
    }

    /**
     * @private
     * @param args
     */
    static createReferenceResolvers({ ...args }) {
        const { entity, schemaProvider } = args;
        const resolvers = {};

        // get all references
        const refs = entity.schema
            .map(field =>
                schemaProvider.getReferenceFieldName(field) !== null
                    ? field
                    : null,
            )
            .filter(x => x);
        if (!_.iane(refs)) {
            return resolvers;
        }

        refs.forEach(field => {
            resolvers[field.name] = schemaProvider.isMultipleField(field)
                ? this.createReferenceResolverMultiple({ field, ...args })
                : this.createReferenceResolverSingle({ field, ...args });
        });

        return resolvers;
    }

    static createReferenceResolverSingle({
        field,
        entityManager,
        schemaProvider,
    }) {
        return async (source, args, { requestId, dataLoaderPool }, state) => {
            const refValue = source[field.name];
            // check if there is nothing to reference through
            if (typeof refValue === 'undefined' || refValue === null) {
                return null;
            }

            const refEntityName = schemaProvider.getReferenceFieldName(field);
            const refDBEntity = await entityManager.getByName(refEntityName);
            const refEntity = await schemaProvider.getByName(refEntityName);
            if (!refDBEntity || !refEntity) {
                throw new Error(
                    `Schema is corrupted. No entity under name ${refEntityName} found`,
                );
            }

            // todo: use connection here
            const repo = getRepository(refDBEntity);
            const loader = dataLoaderPool.get(refEntityName, async ids => {
                const errors = [];
                let ix = {};

                // todo: refactor this
                try {
                    (await repo.find({
                        where: {
                            id: In(ids),
                        },
                    })).forEach(item => {
                        ix[item.id] = item;
                    });
                } catch (e) {
                    errors.push({
                        code: 'internal',
                        message: __DEV__ ? e.message : 'Internal error',
                    });
                    logger.error('Internal error', e);
                }

                // maintain the right order
                return ids.map(id => {
                    return {
                        item: id in ix ? ix[id] : null,
                        errors,
                    };
                });
            });

            const item = await loader.load(refValue);
            if (_.iane(item.errors)) {
                // something is wrong
                return null;
            }

            return item.item;
        };
    }

    static createReferenceResolverMultiple({
        field,
        entity,
        entityManager,
        schemaProvider,
    }) {
        return async (source, args, { requestId }, state) => {
            const refValue = source.id;
            // check if there is nothing to reference through
            if (typeof refValue === 'undefined' || refValue === null) {
                return [];
            }

            const refEntityName = schemaProvider.getReferenceFieldName(field);
            const refDBEntity = await entityManager.getByName(refEntityName);
            const refEntity = await schemaProvider.getByName(refEntityName);
            const refTableEntityName = getRefName(entity, field);
            const refTableDBEntity = await entityManager.getByName(
                refTableEntityName,
            );

            if (
                !refDBEntity ||
                !refEntity ||
                !refTableEntityName ||
                !refTableDBEntity
            ) {
                throw new Error(
                    `Schema is corrupted. No entity under name ${refEntityName} found`,
                );
            }

            const { filter, sort, limit, offset } = args;
            // todo: batch
            const canBatch =
                typeof limit === 'undefined' && typeof offset === 'undefined';

            let items = [];
            const errors = [];
            // todo: use connection here
            const repo = getRepository(refDBEntity);
            const qb = repo.createQueryBuilder(refEntityName);
            const refName = field.name;

            try {
                // todo: apply parameters: sort, filter, limit, offset
                // todo: make the selected field set narrow
                items = await qb
                    .innerJoinAndSelect(
                        refTableDBEntity,
                        refName,
                        `${refName}.rel = ${this.sanitize(
                            refEntityName,
                        )}.id and ${refName}.self = :refValue`,
                        { refValue },
                    )
                    .getMany();
            } catch (e) {
                errors.push({
                    code: 'internal',
                    message: __DEV__ ? e.message : 'Internal error',
                });
                logger.error('Internal error', e);
            }

            if (_.iane(errors)) {
                return [];
            }

            return items;
        };
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

    static makeWhereFind(filter, search) {
        const where = {};

        if (_.isne(search)) {
            // a very basic type of search - by the part of code
            where.code = Like(`%${search.replace(/[^a-zA-Z0-9_-]/, '')}%`);
        }

        return where;
    }

    static convertToPlain(dbItem, entity) {
        const plain = {};
        entity.getFields().forEach(field => {
            const fieldName = field.getName();
            const fieldType = field.getActualType();
            const fieldValue = dbItem[fieldName];
            if (typeof fieldValue !== 'undefined' && fieldValue !== null) {
                // todo: probably, apollo server is capable of casting Date to String by it's own?
                if (fieldType === TYPE_DATETIME) {
                    if (fieldValue instanceof Date) {
                        plain[fieldName] = fieldValue.toISOString();
                    }
                } else {
                    plain[fieldName] = fieldValue;
                }
            } else {
                plain[fieldName] = null;
            }
        });

        // plus id, always there
        if ('id' in dbItem) {
            plain.id = dbItem.id;
        }

        return plain;
    }

    static sanitize(value) {
        return value.replace(/[^a-zA-Z0-9_]/g, '');
    }
}
