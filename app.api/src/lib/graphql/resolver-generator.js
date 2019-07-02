/**
 * https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md
 */

import { getRepository, In, Like } from 'typeorm';
import uuid from 'uuid/v4';
import { TYPE_DATETIME, QUERY_FIND_MAX_PAGE_SIZE } from 'project-minimum-core';
import { getRefName } from '../entity-util';
import { getASTAt, getSelectionAt } from './ast';
import { CodeId } from '../database/code-id';

export default class ResolverGenerator {
    static make(schema, databaseEntityManager, connection) {
        const entities = Object.values(schema.getSchema());

        return entities.map(entity =>
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

        return async (source, args, context, info) => {
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

            const selectedFields = getSelectionAt(info, 'data');
            const repository = connection.getRepository(databaseEntity);

            let dbItem = null;
            await this.wrap(async () => {
                dbItem = await repository.findOne({
                    where: {
                        code: code.trim(),
                    },
                    select: this.getRealFields(selectedFields, entity),
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

    static makeFindForEntity(
        entity,
        schema,
        databaseEntityManager,
        connection,
    ) {
        const databaseEntity = databaseEntityManager.getByDefinition(entity);

        return async (source, args, context, info) => {
            const result = {
                errors: [],
                data: [],
                limit: QUERY_FIND_MAX_PAGE_SIZE,
                offset: 0,
            };

            const { filter, search, sort } = args;

            const { limit, offset } = this.getLimitOffset(args);
            if (limit > QUERY_FIND_MAX_PAGE_SIZE) {
                result.errors.push({
                    code: 'limit_too_high',
                    message: 'Limit too high',
                });

                return result;
            }

            if (filter !== undefined && search !== undefined) {
                result.errors.push({
                    code: 'search_filter_conflict',
                    message:
                        'You can not set both search and filter at the same time',
                });

                return result;
            }

            result.limit = limit;
            result.offset = offset;

            const selectedFields = getSelectionAt(info, 'data');
            const repository = connection.getRepository(databaseEntity);
            const where = this.makeWhereFind(filter, search);

            await this.wrap(async () => {
                result.data = (await repository.find({
                    select: this.getRealFields(selectedFields, entity),
                    where,
                    order: _.ione(sort) ? sort : {},
                    skip: result.offset,
                    take: result.limit,
                })).map(item => this.convertToPlain(item, entity));
            }, result.errors);

            if (getASTAt(info, 'count')) {
                // count asked
                await this.wrap(async () => {
                    result.count = await repository.count({
                        where,
                    });
                }, result.errors);
            }

            return result;
        };
    }

    static makePutForEntity(entity, schema, databaseEntityManager, connection) {
        const databaseEntity = databaseEntityManager.getByDefinition(entity);

        return async (source, args) => {
            const result = {
                errors: [],
                code: null,
                data: {},
            };

            let { code, data } = args;

            const repository = connection.getRepository(databaseEntity);
            delete data.code; // there is no way to set the code manually

            let isNewItem = false;
            if (!_.isne(code)) {
                code = uuid();
                data.code = code;
                isNewItem = true;
            }

            // cast everything that is possible to cast
            data = entity.prepareData(data);
            // then validate
            const { errors, data: safeData } = await entity.validateData(data);
            if (errors) {
                result.errors = errors.map(error => ({
                    message: error.message,
                    code: 'validation',
                    reference: error.field,
                }));

                return result;
            }

            data = safeData;

            const singleReferences = entity
                .getFields()
                .filter(field => field.isReference() && !field.isMultiple());

            await this.wrap(async () => {
                const codeToId = new CodeId({
                    connection,
                });

                // translate all single-reference codes to ids
                for (let i = 0; i < singleReferences.length; i += 1) {
                    const reference = singleReferences[i];
                    const referenceFieldName = reference.getName();
                    const referencedEntityName = reference.getReferencedEntityName();
                    codeToId.addCode(
                        data[referenceFieldName],
                        referencedEntityName,
                    );
                }

                await codeToId.obtain();

                for (let i = 0; i < singleReferences.length; i += 1) {
                    const reference = singleReferences[i];
                    const referenceFieldName = reference.getName();
                    data[referenceFieldName] = codeToId.getId(
                        data[referenceFieldName],
                    );
                }

                return result;

                let dbItem = null;
                if (isNewItem) {
                    dbItem = repository.create(data);
                } else {
                    // find id by code
                    dbItem = await repository.findOne({
                        code: code.trim(),
                    });
                    if (!dbItem) {
                        result.errors.push({
                            code: 'not_found',
                            message: 'Element not found',
                        });
                        return result;
                    }
                    repository.merge(dbItem, data);
                }

                await repository.save(dbItem);
                // await this.managerMultipleReferences(
                //     entity,
                //     dbItem.id,
                //     data,
                //     schemaProvider,
                //     entityManager,
                // );

                result.code = code;
                result.data = this.convertToPlain(dbItem, entity);
            }, result.errors);

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
                [`${name}Find`]: this.makeFindForEntity(
                    entity,
                    schema,
                    databaseEntityManager,
                    connection,
                ),
            },
            // process mutation - Put and Delete
            Mutation: {
                [`${name}Put`]: this.makePutForEntity(
                    entity,
                    schema,
                    databaseEntityManager,
                    connection,
                ),
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
            const multiple = field.isMultiple();
            const fieldValue = dbItem[fieldName];
            if (typeof fieldValue !== 'undefined' && fieldValue !== null) {
                // todo: probably, apollo server is capable of casting Date to String by it's own?
                if (fieldType === TYPE_DATETIME) {
                    if (multiple) {
                        plain[fieldName] = fieldValue.map(subItem =>
                            subItem instanceof Date
                                ? subItem.toISOString()
                                : null,
                        );
                    } else {
                        plain[fieldName] =
                            fieldValue instanceof Date
                                ? fieldValue.toISOString()
                                : null;
                    }
                } else {
                    plain[fieldName] = fieldValue;
                }
            } else if (fieldName in dbItem) {
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

    static getRealFields(fields, entity) {
        const realFields = entity
            .getFields()
            .filter(field => !(field.isReference() && field.isMultiple()))
            .map(field => field.getName());
        const toSelect = _.intersection(fields, realFields);
        if (!toSelect.includes('id')) {
            toSelect.push('id');
        }
        if (!toSelect.includes('code')) {
            toSelect.push('code');
        }

        return toSelect;
    }

    static getLimitOffset(args) {
        let { limit, offset, page, pageSize } = args;

        limit = parseInt(limit, 10);
        if (Number.isNaN(limit)) {
            limit = QUERY_FIND_MAX_PAGE_SIZE;
        }

        offset = parseInt(offset, 10);
        if (Number.isNaN(offset)) {
            offset = 0;
        }

        pageSize = parseInt(pageSize, 10);
        if (!Number.isNaN(pageSize)) {
            limit = pageSize;
        }

        page = parseInt(page, 10);
        if (!Number.isNaN(page)) {
            offset = (page - 1) * limit;
        }

        return { limit, offset };
    }
}
