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
            if (typeof code !== 'string' || !code.length) {
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

            const singleReferences = this.getSingleReferences(entity);

            await this.wrap(async () => {
                const codeToId = new CodeId({
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
                    );
                    if (referenceFieldName in data) {
                        codeToId.addCode(
                            data[referenceFieldName],
                            referencedDatabaseEntity,
                        );
                    }
                }

                await codeToId.obtain();

                for (let i = 0; i < singleReferences.length; i += 1) {
                    const reference = singleReferences[i];
                    const referenceFieldName = reference.getName();

                    if (referenceFieldName in data) {
                        data[referenceFieldName] = codeToId.getId(
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
                            code: code.trim(),
                        },
                        select: ['id'],
                    });
                    if (!databaseItem) {
                        result.errors.push({
                            code: 'not_found',
                            message: 'Element not found',
                        });
                        return result;
                    }
                    repository.merge(databaseItem, data);
                }

                await repository.save(databaseItem);
                await this.manageMultipleReferences({
                    entity,
                    databaseEntityManager,
                    connection,
                    id: databaseItem.id,
                    data,
                });

                result.code = code;
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
                code: null,
                data: {},
            };

            const { code } = args;

            if (typeof code !== 'string' || !code.length) {
                result.errors.push({
                    code: 'illegal_code',
                    message: 'Code is illegal',
                });

                return result;
            }

            result.code = code;

            const repository = connection.getRepository(databaseEntity);

            const item = await repository.findOne({
                where: { code: code.trim() },
                select: ['id'],
            });
            if (!item) {
                result.errors.push({
                    code: 'not_found',
                    message: 'Element not found',
                });
            } else {
                const id = repository.getId(item);
                await this.wrap(async () => {
                    await repository.delete(id);
                }, result.errors);

                // drop reference data
                const references = this.getMultipleReferences(entity);

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
        connection,
        id,
        data,
    }) {
        const references = this.getMultipleReferences(entity);

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
            );

            if (referenceFieldName in data) {
                const ids = [];
                const values = data[referenceFieldName];

                if (Array.isArray(values) && values.length) {
                    const codeToId = new CodeId({
                        connection,
                    });
                    values.forEach(code =>
                        codeToId.addCode(code, referencedDatabaseEntity),
                    );

                    // eslint-disable-next-line no-await-in-loop
                    await codeToId.obtain();

                    values.forEach(code => ids.push(codeToId.getId(code)));
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
                    .where('self = :id', { id })
                    .execute();

                // and re-create
                if (ids.length) {
                    // eslint-disable-next-line no-await-in-loop
                    await referenceQueryBuilder
                        .insert()
                        .into(referenceTableName)
                        .values(
                            ids.map(referenceId => ({
                                self: id,
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
        const references = this.getReferences(entity);
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
                ? null // this.makeReferenceResolverMultiple({ referenceField, ...args })
                : this.makeReferenceResolverSingle({ referenceField, ...args });
        });

        return resolvers;
    }

    static makeReferenceResolverSingle({
        referenceField,
        entity,
        // schema,
        databaseEntityManager,
        connection,
    }) {
        return async (source, args, { dataLoaderPool }, info) => {
            // check if the parent item data does not have any value that we can reference with
            const referenceValue = source[referenceField.getName()];
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
            );

            const selectedFields = getSelectionAt(info, 'data');
            const select = this.getRealFields(selectedFields, entity);
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
                            id: In(ids),
                        },
                        select,
                    });

                    items.forEach(item => {
                        map[item.id] = item;
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

    static getReferenceAttributes(
        referenceField,
        databaseEntityManager,
        entity,
    ) {
        // the name of the field we use to access this relation (e.g. "person" or "pets")
        const referenceFieldName = referenceField.getName();
        // the database entity name, which we make a reference to (e.g. "eq_person" or "eq_pet")
        const referencedEntityName = referenceField.getReferencedEntityName();
        // the entity itself
        const referencedDatabaseEntity = databaseEntityManager.getByName(
            referencedEntityName,
        );

        // only for multiple
        // a table we use to store multiple references (e.g. "eq_person_2_pet")
        let referenceTableName = null;
        // a database entity that is represented by this table
        let referenceDatabaseEntity = null;
        if (referenceField.isMultiple()) {
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
            referencedDatabaseEntity,
            referenceTableName,
            referenceDatabaseEntity,
            referencedEntityName,
        };
    }

    static getSingleReferences(entity) {
        return entity
            .getFields()
            .filter(field => field.isReference() && !field.isMultiple());
    }

    static getMultipleReferences(entity) {
        return entity
            .getFields()
            .filter(field => field.isReference() && field.isMultiple());
    }

    static getReferences(entity) {
        return entity.getFields().filter(field => field.isReference());
    }
}
