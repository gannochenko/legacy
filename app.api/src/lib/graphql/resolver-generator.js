/**
 * https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md
 */

import { In, Like } from 'typeorm';
import uuid from 'uuid/v4';
import {
    FIELD_TYPE_DATETIME,
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
} from 'project-minimum-core';
import { getASTAt, getSelectionAt } from './ast';
import { IdMapper } from '../database/id-mapper';
import { Query } from '../database/query';

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

            const { id } = args;

            if (!_.isne(id)) {
                result.errors.push({
                    code: `${ENTITY_ID_FIELD_NAME}_missing`,
                    message: `Argument "${ENTITY_ID_FIELD_NAME}" is missing in the request`,
                });
                return result;
            }

            const selectedFields = getSelectionAt(info, 'data');
            const repository = connection.getRepository(databaseEntity);

            let dbItem = null;
            await this.wrap(async () => {
                dbItem = await repository.findOne({
                    where: {
                        [ENTITY_ID_FIELD_NAME]: id.trim(),
                    },
                    select: Query.prepareSelect(selectedFields, entity),
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
                limit: DB_QUERY_FIND_MAX_PAGE_SIZE,
                offset: 0,
            };

            const { filter, search, sort } = args;

            const { limit, offset } = Query.prepareLimitOffset(args);
            if (limit > DB_QUERY_FIND_MAX_PAGE_SIZE) {
                result.errors.push({
                    code: 'limit_too_high',
                    message: 'Limit too high',
                });

                return result;
            }
            result.limit = limit;
            result.offset = offset;

            if (filter !== undefined && search !== undefined) {
                result.errors.push({
                    code: 'search_filter_conflict',
                    message:
                        'You can not set both search and filter at the same time',
                });
                return result;
            }

            const selectedFields = getSelectionAt(info, 'data');
            const repository = connection.getRepository(databaseEntity);

            const where = this.makeWhereFind(filter, search);

            await this.wrap(async () => {
                result.data = (await repository.find({
                    select: Query.prepareSelect(selectedFields, entity),
                    where,
                    order: Query.prepareOrderBy(sort, entity),
                    skip: offset,
                    take: limit,
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
                [ENTITY_ID_FIELD_NAME]: null,
                data: {},
            };

            let { id, data } = args;

            const repository = connection.getRepository(databaseEntity);
            delete data[ENTITY_ID_FIELD_NAME]; // there is no way to set the id manually

            let isNewItem = false;
            if (typeof id !== 'string' || !id.length) {
                id = uuid();
                data[ENTITY_ID_FIELD_NAME] = id;
                isNewItem = true;
            }

            // cast everything that is possible to cast
            data = entity.castData(data);
            // then validate

            const errors = await entity.validateData(data);
            if (errors) {
                result.errors = errors.map(error => ({
                    message: error.message,
                    code: 'validation',
                    reference: error.fieldName,
                }));

                return result;
            }

            const singleReferences = entity.getSingleReferences();

            await this.wrap(async () => {
                const idToInternal = new IdMapper({
                    connection,
                });

                // translate all single-reference codes to ids
                for (let i = 0; i < singleReferences.length; i += 1) {
                    const {
                        referenceFieldName,
                        referencedDatabaseEntity,
                    } = this.getReferenceAttributes(
                        singleReferences[i],
                        databaseEntityManager,
                        entity,
                        schema,
                    );
                    if (referenceFieldName in data) {
                        idToInternal.addId(
                            data[referenceFieldName],
                            referencedDatabaseEntity,
                        );
                    }
                }

                await idToInternal.obtain();

                for (let i = 0; i < singleReferences.length; i += 1) {
                    const reference = singleReferences[i];
                    const referenceFieldName = reference.getName();

                    if (referenceFieldName in data) {
                        data[referenceFieldName] = idToInternal.getInternalId(
                            data[referenceFieldName],
                        );
                    }
                }

                let databaseItem = null;
                if (isNewItem) {
                    databaseItem = repository.create(data);
                } else {
                    // find id by code
                    databaseItem = await repository.findOne({
                        where: {
                            [ENTITY_ID_FIELD_NAME]: id.trim(),
                        },
                        select: [ENTITY_PK_FIELD_NAME],
                    });
                    if (!databaseItem) {
                        result.errors.push({
                            code: 'not_found',
                            message: 'Element not found',
                        });
                        return;
                    }
                    repository.merge(databaseItem, data);
                }

                await repository.save(databaseItem);
                await this.manageMultipleReferences({
                    entity,
                    databaseEntityManager,
                    connection,
                    [ENTITY_PK_FIELD_NAME]: databaseItem[ENTITY_PK_FIELD_NAME],
                    data,
                    schema,
                });

                result[ENTITY_ID_FIELD_NAME] = id;
                result.data = this.convertToPlain(databaseItem, entity);
            }, result.errors);

            return result;
        };
    }

    static makeDeleteForEntity(
        entity,
        schema,
        databaseEntityManager,
        connection,
    ) {
        const databaseEntity = databaseEntityManager.getByDefinition(entity);

        return async (source, args) => {
            const result = {
                errors: [],
                [ENTITY_ID_FIELD_NAME]: null,
                data: {},
            };

            const { id } = args;

            if (typeof id !== 'string' || !id.length) {
                result.errors.push({
                    code: 'illegal_id',
                    message: 'Id is illegal',
                });

                return result;
            }

            result[ENTITY_ID_FIELD_NAME] = id;

            const repository = connection.getRepository(databaseEntity);

            const item = await repository.findOne({
                where: { [ENTITY_ID_FIELD_NAME]: id.trim() },
                select: [ENTITY_PK_FIELD_NAME],
            });
            if (!item) {
                result.errors.push({
                    code: 'not_found',
                    message: 'Element not found',
                });
            } else {
                const idInternal = repository.getId(item);
                await this.wrap(async () => {
                    await repository.delete(idInternal);
                }, result.errors);

                // drop reference data
                const references = entity.getMultipleReferences();

                for (let i = 0; i < references.length; i += 1) {
                    const referenceField = references[i];
                    const {
                        // referenceFieldName,
                        referenceTableName,
                        referenceDatabaseEntity,
                        // referencedDatabaseEntity,
                    } = this.getReferenceAttributes(
                        referenceField,
                        databaseEntityManager,
                        entity,
                        schema,
                    );

                    const referenceRepository = connection.getRepository(
                        referenceDatabaseEntity,
                    );
                    const referenceQueryBuilder = referenceRepository.createQueryBuilder(
                        referenceTableName,
                    );

                    // delete all
                    // eslint-disable-next-line no-await-in-loop
                    await referenceQueryBuilder
                        .delete()
                        .from(referenceTableName)
                        .where('self = :id', { id })
                        .execute();
                }
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
            Mutation: {
                [`${name}Put`]: this.makePutForEntity(
                    entity,
                    schema,
                    databaseEntityManager,
                    connection,
                ),
                [`${name}Delete`]: this.makeDeleteForEntity(
                    entity,
                    schema,
                    databaseEntityManager,
                    connection,
                ),
            },
            [name]: this.makeReferenceResolversForEntity(
                entity,
                schema,
                databaseEntityManager,
                connection,
            ),
        };
    }

    static async manageMultipleReferences({
        entity,
        databaseEntityManager,
        schema,
        connection,
        idInternal,
        data,
    }) {
        const references = entity.getMultipleReferences();

        for (let i = 0; i < references.length; i += 1) {
            const referenceField = references[i];
            const {
                referenceFieldName,
                referenceTableName,
                referenceDatabaseEntity,
                referencedDatabaseEntity,
            } = this.getReferenceAttributes(
                referenceField,
                databaseEntityManager,
                entity,
                schema,
            );

            if (referenceFieldName in data) {
                const ids = [];
                const values = data[referenceFieldName];

                if (Array.isArray(values) && values.length) {
                    const idMapper = new IdMapper({
                        connection,
                    });
                    values.forEach(idItem =>
                        idMapper.addId(idItem, referencedDatabaseEntity),
                    );

                    // eslint-disable-next-line no-await-in-loop
                    await idMapper.obtain();

                    values.forEach(idItem =>
                        ids.push(idMapper.getInternalId(idItem)),
                    );
                }

                const referenceRepository = connection.getRepository(
                    referenceDatabaseEntity,
                );
                const referenceQueryBuilder = referenceRepository.createQueryBuilder(
                    referenceTableName,
                );

                // delete all
                // eslint-disable-next-line no-await-in-loop
                await referenceQueryBuilder
                    .delete()
                    .from(referenceTableName)
                    .where('self = :id', { idInternal })
                    .execute();

                // and re-create
                if (ids.length) {
                    // eslint-disable-next-line no-await-in-loop
                    await referenceQueryBuilder
                        .insert()
                        .into(referenceTableName)
                        .values(
                            ids.map(referenceId => ({
                                self: idInternal,
                                rel: referenceId,
                            })),
                        )
                        .execute();
                }
            }
        }
    }

    static makeReferenceResolversForEntity(
        entity,
        schema,
        databaseEntityManager,
        connection,
    ) {
        const resolvers = {};

        // get all references
        const references = entity.getReferences();
        if (!references.length) {
            return resolvers;
        }

        const args = {
            entity,
            schema,
            databaseEntityManager,
            connection,
        };

        references.forEach(referenceField => {
            resolvers[referenceField.getName()] = referenceField.isMultiple()
                ? this.makeReferenceResolverMultiple({
                      referenceField,
                      ...args,
                  })
                : this.makeReferenceResolverSingle({ referenceField, ...args });
        });

        return resolvers;
    }

    static makeReferenceResolverSingle({
        referenceField,
        entity,
        databaseEntityManager,
        schema,
        connection,
    }) {
        return async (source, args, { dataLoaderPool }, info) => {
            const referenceFieldName = referenceField.getName();

            // check if the parent item data does not have any value that we can reference with
            const referenceValue = source[referenceFieldName];
            if (!parseInt(referenceValue, 10)) {
                return null;
            }

            const {
                referencedDatabaseEntity,
                referencedEntityName,
            } = this.getReferenceAttributes(
                referenceField,
                databaseEntityManager,
                entity,
                schema,
            );

            const selectedFields = getSelectionAt(info);
            const select = Query.prepareSelect(selectedFields, entity);
            const referencedRepository = connection.getRepository(
                referencedDatabaseEntity,
            );

            const key = `${referencedEntityName}__${select.join('.')}`;
            const loader = dataLoaderPool.get(key, async ids => {
                const errors = [];
                const map = {};

                try {
                    const items = await referencedRepository.find({
                        where: {
                            idInternal: In(ids),
                        },
                        select,
                    });

                    items.forEach(item => {
                        map[item.idInternal] = item;
                    });
                } catch (e) {
                    errors.push({
                        code: 'internal',
                        message: __DEV__ ? e.message : 'Internal error',
                    });
                    logger.error('Unable to fetch some items', e);
                }

                // maintain the right order
                return ids.map(id => ({
                    item: id in map ? map[id] : null,
                    errors,
                }));
            });

            const item = await loader.load(referenceValue);
            if (item.errors.length) {
                return null;
            }

            return item.item;
        };
    }

    static makeReferenceResolverMultiple({
        referenceField,
        entity,
        databaseEntityManager,
        schema,
        connection,
    }) {
        return async (source, args, context, info) => {
            // check if the parent item data does not have any value that we can reference with
            const referenceValue = source[ENTITY_PK_FIELD_NAME];
            if (!parseInt(referenceValue, 10)) {
                return [];
            }

            const {
                referenceFieldName,
                referenceTableName,
                referencedDatabaseEntity,
                referencedTableName,
                referencedEntity,
            } = this.getReferenceAttributes(
                referenceField,
                databaseEntityManager,
                entity,
                schema,
            );

            const referencedRepository = connection.getRepository(
                referencedDatabaseEntity,
            );
            const referencedQueryBuilder = referencedRepository.createQueryBuilder();

            let { query } = Query.make({
                args: { ...args, select: getSelectionAt(info) },
                queryBuilder: referencedQueryBuilder,
                entity: referencedEntity,
                tableName: referencedTableName,
                parameters: {
                    restrictLimit: false,
                },
            });

            // todo: this kind of query can be batched in some cases
            // const canBatch =
            //     typeof limit === 'undefined' && typeof offset === 'undefined';

            let items = [];
            const errors = [];

            try {
                const referencedTableNameSafe = Query.sanitize(
                    referencedTableName,
                );
                const referenceFieldNameSafe = Query.sanitize(
                    referenceFieldName,
                );

                query = query
                    // filter by the relation
                    .innerJoinAndSelect(
                        referenceTableName,
                        referenceFieldName,
                        `${referenceFieldNameSafe}.rel = ${referencedTableNameSafe}.${ENTITY_PK_FIELD_NAME} and ${referenceFieldNameSafe}.self = :referenceValue`,
                        { referenceValue },
                    );

                items = await query.getMany();
                // items = await query.getRawMany();
            } catch (e) {
                errors.push({
                    code: 'internal',
                    message: __DEV__ ? e.message : 'Internal error',
                });
                logger.error('Internal error', e);
            }

            if (errors.length) {
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
            where[ENTITY_ID_FIELD_NAME] = Like(
                `%${search.replace(/[^a-zA-Z0-9_-]/, '')}%`,
            );
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
                if (fieldType === FIELD_TYPE_DATETIME) {
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
        if (ENTITY_PK_FIELD_NAME in dbItem) {
            plain[ENTITY_PK_FIELD_NAME] = dbItem[ENTITY_PK_FIELD_NAME];
        }

        return plain;
    }

    static getReferenceAttributes(
        referenceField,
        databaseEntityManager,
        entity,
        schema,
    ) {
        // the name of the field we use to access this relation (e.g. "partner" or "pets")
        const referenceFieldName = referenceField.getName();

        // ///////////////////////////////////////
        // ReferencED entity
        // the database entity name, which we make a reference to (e.g. "person" or "pet")
        const referencedEntityName = referenceField.getReferencedEntityName();
        // the referenced schema entity
        const referencedEntity = schema.getEntity(referencedEntityName);
        // the referenced database entity
        const referencedDatabaseEntity = databaseEntityManager.getByName(
            referencedEntityName,
        );
        // the table name of the referenced database entity (e.g. "eq_e_person" or "eq_e_pet")
        const referencedTableName = databaseEntityManager.constructor.getTableName(
            referencedEntity,
        );

        // ///////////////////////////////////////
        // Reference entity (only for multiple)
        let referenceEntityName = null;
        // a database entity that is represented by this table
        let referenceDatabaseEntity = null;
        // a table we use to store multiple references
        let referenceTableName = null;
        if (referenceField.isMultiple()) {
            referenceEntityName = databaseEntityManager.constructor.getName(
                entity,
                referenceField,
            );

            referenceTableName = databaseEntityManager.constructor.getReferenceTableName(
                entity,
                referenceField,
            );

            // we need to get a database entity by its name
            referenceDatabaseEntity = databaseEntityManager.getByName(
                databaseEntityManager.constructor.getName(
                    entity,
                    referenceField,
                ),
            );
        }

        return {
            referenceFieldName,

            referencedEntity,
            referencedEntityName,
            referencedDatabaseEntity,
            referencedTableName,

            referenceEntityName,
            referenceDatabaseEntity,
            referenceTableName,
        };
    }
}
