/**
 * https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
 */

import {
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    // @ts-ignore
} from 'project-minimum-core';
import { SelectQueryBuilder } from 'typeorm';
import _ from '@bucket-of-bolts/microdash';
import { Entity } from '../project-minimum-core';
import { FindQueryArguments, FindQuerySort } from '../type';

export class Query {
    public static make(
        args: FindQueryArguments,
        queryBuilder: SelectQueryBuilder<unknown>,
        entity: Entity,
        tableName: string,
        parameters = { restrictLimit: true },
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { select, filter, sort } = args;

        const tableNameSafe = this.sanitize(tableName);

        const orderBySafe = this.prepareOrderBy(entity, sort, {
            ...parameters,
            alias: tableNameSafe,
        });

        const selectSafe = this.prepareSelect(entity, select, {
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
        entity: Entity,
        order?: FindQuerySort,
        { alias = '' } = {},
    ): FindQuerySort {
        if (!_.isObjectNotEmpty(order)) {
            return {};
        }

        const prefix = alias ? `${alias}.` : '';
        const legalFields = this.getSortableFieldNames(entity);

        const keys = Object.keys(order as FindQuerySort).filter(fieldName =>
            legalFields.includes(fieldName),
        );

        return keys.reduce(
            (result, fieldName) => ({
                [`${prefix}${fieldName}`]: (order as FindQuerySort)[fieldName],
                ...result,
            }),
            {},
        );
    }

    public static prepareSelect(
        entity: Entity,
        fieldNames?: string[],
        { alias = '' } = {},
    ): string[] {
        const prefix = alias ? `${alias}.` : '';
        let toSelect: string[] = [];

        if (fieldNames && fieldNames.length) {
            toSelect = _.intersection(
                fieldNames,
                this.getSelectableFieldNames(entity),
            );
        }

        if (!toSelect.includes(ENTITY_PK_FIELD_NAME)) {
            toSelect.push(ENTITY_PK_FIELD_NAME);
        }
        if (!toSelect.includes(ENTITY_ID_FIELD_NAME)) {
            toSelect.push(ENTITY_ID_FIELD_NAME);
        }

        return toSelect.map(fieldName => `${prefix}${fieldName}`);
    }

    public static prepareLimitOffset(
        args: FindQueryArguments,
        parameters = { restrictLimit: true },
    ): { limit?: number; offset: number } {
        let { limit, page, pageSize } = args;
        const { offset } = args;
        let safeLimit: number | undefined;
        let safeOffset = 0;

        if (limit !== null && limit !== undefined) {
            limit = parseInt(limit as string, 10);
            if (Number.isNaN(limit)) {
                if (parameters.restrictLimit) {
                    safeLimit = DB_QUERY_FIND_MAX_PAGE_SIZE;
                }
            } else {
                safeLimit = limit;
            }
        } else if (parameters.restrictLimit) {
            safeLimit = DB_QUERY_FIND_MAX_PAGE_SIZE;
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

    public static sanitize(value: string) {
        return value.replace(/[^a-zA-Z0-9_]/g, '');
    }

    private static getSortableFieldNames(entity: Entity) {
        return entity
            .getFields()
            .filter(field => field.isSortable())
            .map(field => field.getName());
    }

    private static getSelectableFieldNames(entity: Entity) {
        return entity
            .getFields()
            .filter(field => !(field.isReference() && field.isMultiple()))
            .map(field => field.getName());
    }
}
