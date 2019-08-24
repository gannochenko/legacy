/**
 * https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
 */

import {
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    // @ts-ignore
} from 'project-minimum-core';
import { Entity } from '../project-minimum-core';
import { FindQueryArguments, FindQuerySort } from '../type';

export class Query {
    public static make(
        args: FindQueryArguments,
        queryBuilder,
        entity: Entity,
        tableName: string,
        parameters = { restrictLimit: true },
    ) {
        const { select, filter, sort } = args;

        const tableNameSafe = this.sanitize(tableName);

        const orderBySafe = this.prepareOrderBy(sort, entity, {
            ...parameters,
            alias: tableNameSafe,
        });

        const selectSafe = this.prepareSelect(select, entity, {
            ...parameters,
            alias: tableNameSafe,
        });

        const { limit, offset } = this.prepareLimitOffset(args, parameters);

        // todo: apply "where"

        let query = queryBuilder.select(selectSafe).skip(offset);

        if (orderBySafe) {
            query = query.orderBy(orderBySafe);
        }

        if (limit !== null) {
            query = query.take(limit);
        }

        return { query, limit };
    }

    public static prepareOrderBy(
        order?: FindQuerySort,
        entity: Entity,
        { alias = '' } = {},
    ) {
        if (!_.isObjectNotEmpty(order)) {
            return null;
        }

        const prefix = alias ? `${alias}.` : '';
        const legalFields = this.getLegalFieldNames(entity);

        const keys = Object.keys(order).filter(fieldName =>
            legalFields.includes(fieldName),
        );

        return keys.reduce(
            (result, fieldName) => ({
                [`${prefix}${fieldName}`]: order[fieldName],
                ...result,
            }),
            {},
        );
    }

    public static prepareLimitOffset(
        args: FindQueryArguments,
        parameters = { restrictLimit: true },
    ): { limit: Nullable<number>; offset: number } {
        let { limit, page, pageSize } = args;
        const { offset } = args;
        let safeLimit: Nullable<number> = null;
        let safeOffset: Nullable<number> = 0;

        if (limit !== null && limit !== undefined) {
            limit = parseInt(limit as string, 10);
            if (Number.isNaN(limit)) {
                if (parameters.restrictLimit) {
                    safeLimit = DB_QUERY_FIND_MAX_PAGE_SIZE;
                }
            }
        }

        if (offset !== null && offset !== undefined) {
            const parsedOffset: number = parseInt(offset as string, 10);
            if (!Number.isNaN(parsedOffset)) {
                safeOffset = parsedOffset;
            }
        }

        if (pageSize !== null && pageSize !== undefined) {
            pageSize = parseInt(pageSize as string, 10);
            if (!Number.isNaN(pageSize)) {
                safeLimit = pageSize;

                if (page !== null && pageSize !== undefined) {
                    page = parseInt(page as string, 10);
                    if (!Number.isNaN(page)) {
                        safeOffset = (page - 1) * pageSize;
                    }
                }
            }
        }

        return { limit: safeLimit, offset: safeOffset };
    }

    public static prepareSelect(
        fieldNames?: string[],
        entity: Entity,
        { alias = '' } = {},
    ) {
        const prefix = alias ? `${alias}.` : '';
        const toSelect = _.intersection(
            fieldNames,
            this.getLegalFieldNames(entity),
        ).map((fieldName: string) => `${prefix}${fieldName}`);

        if (!toSelect.includes(`${prefix}${ENTITY_PK_FIELD_NAME}`)) {
            toSelect.push(`${prefix}${ENTITY_PK_FIELD_NAME}`);
        }
        if (!toSelect.includes(`${prefix}${ENTITY_ID_FIELD_NAME}`)) {
            toSelect.push(`${prefix}${ENTITY_ID_FIELD_NAME}`);
        }

        return toSelect;
    }

    private static getLegalFieldNames(entity: Entity) {
        return entity
            .getFields()
            .filter(field => !(field.isReference() && field.isMultiple()))
            .map(field => field.getName());
    }

    public static sanitize(value: string) {
        return value.replace(/[^a-zA-Z0-9_]/g, '');
    }
}
