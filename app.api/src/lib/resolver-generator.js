import { getManager, getRepository, In } from 'typeorm';
import uuid from 'uuid/v4';
import { getRefName } from './entity-util';

import Validator from './validator';
import { ENTITY_TYPE_DATE, QUERY_FIND_MAX_PAGE_SIZE } from '../constants';

export default class ResolverGenerator {
    static async make({ schemaProvider, entityManager, connection }) {
        const entities = await entityManager.get();
        return Object.values(await schemaProvider.get()).map(entity =>
            this.makeForEntity(
                entity,
                entities[entity.name],
                entityManager,
                schemaProvider,
                connection,
            ),
        );
    }

    /**
     * @private
     * @param entity
     * @param dbEntity
     * @param entityManager
     * @param schemaProvider
     */
    static makeForEntity(
        entity,
        dbEntity,
        entityManager,
        schemaProvider,
        connection,
    ) {
        const nameCamel = schemaProvider.getCamelEntityName(entity.name);

        return {
            // process query - Get and Find
            Query: {
                [`${nameCamel}Get`]: async (
                    source,
                    args,
                    { requestId },
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
                    { requestId },
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
                            await this.manageReferences(
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
                            const id = repo.getId(item);
                            await this.wrap(async () => {
                                await repo.delete(id);
                            }, result.errors);

                            // drop refs
                            // get all references
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
            // process reference traversal
            [nameCamel]: this.createReferenceResolvers({
                entity,
                dbEntity,
                entityManager,
                schemaProvider,
                connection,
            }),
        };
    }

    static async manageReferences(
        entity,
        id,
        data,
        schemaProvider,
        entityManager,
    ) {
        // get all references
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
                const values = data[field.name];
                const refEntityName = schemaProvider.getReferenceFieldName(
                    field,
                );
                const refDBEntity = await entityManager.getByName(
                    refEntityName,
                );
                const repo = getRepository(refDBEntity);
                const qb = repo.createQueryBuilder(refEntityName);

                // todo: optimise: get code and id only!
                const ids = (await qb
                    .where({
                        code: In(values),
                    })
                    .getMany()).map(item => item.id);

                const refTableEntityName = getRefName(entity, field);
                const refTableDBEntity = await entityManager.getByName(
                    refTableEntityName,
                );

                const rrepo = getRepository(refTableDBEntity);
                const rqb = rrepo.createQueryBuilder(refTableDBEntity);

                // delete all
                await rqb
                    .delete()
                    .from(refTableDBEntity)
                    .where('self = :id', { id })
                    .execute();

                // and re-create
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
