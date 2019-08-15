/**
 * https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md
 */

import {
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
} from 'project-minimum-core';

export class Query {
    static make({
        args,
        queryBuilder,
        entity,
        tableName,
        parameters = { restrictLimit: true },
    }) {
        const { select, filter, sort } = args;

        const tableNameSafe = this.sanitize(tableName);

        const selectSafe = this.prepareSelect(select, entity, {
            ...parameters,
            alias: tableNameSafe,
        });
        const orderBySafe = this.prepareOrderBy(sort, entity, {
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

    static prepareOrderBy(order, entity, { alias = '' } = {}) {
        if (!_.ione(order)) {
            return null;
        }

        const prefix = alias ? `${alias}.` : '';
        const legalFields = this.getLegalFields(entity);

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

    static prepareLimitOffset(args, parameters = { restrictLimit: true }) {
        let { limit, offset, page, pageSize } = args;

        limit = parseInt(limit, 10);
        if (Number.isNaN(limit)) {
            if (parameters.restrictLimit) {
                limit = DB_QUERY_FIND_MAX_PAGE_SIZE;
            } else {
                limit = null;
            }
        }

        offset = parseInt(offset, 10);
        if (Number.isNaN(offset)) {
            offset = 0;
        }

        pageSize = parseInt(pageSize, 10);
        if (!Number.isNaN(pageSize)) {
            limit = pageSize;

            page = parseInt(page, 10);
            if (!Number.isNaN(page)) {
                offset = (page - 1) * pageSize;
            }
        }

        return { limit, offset };
    }

    static prepareSelect(fields, entity, { alias = '' } = {}) {
        const prefix = alias ? `${alias}.` : '';
        const toSelect = _.intersection(
            fields,
            this.getLegalFields(entity),
        ).map(fieldName => `${prefix}${fieldName}`);

        if (!toSelect.includes(`${prefix}${ENTITY_PK_FIELD_NAME}`)) {
            toSelect.push(`${prefix}${ENTITY_PK_FIELD_NAME}`);
        }
        if (!toSelect.includes(`${prefix}${ENTITY_ID_FIELD_NAME}`)) {
            toSelect.push(`${prefix}${ENTITY_ID_FIELD_NAME}`);
        }

        return toSelect;
    }

    static getLegalFields(entity) {
        return entity
            .getFields()
            .filter(field => !(field.isReference() && field.isMultiple()))
            .map(field => field.getName());
    }

    static sanitize(value) {
        return value.replace(/[^a-zA-Z0-9_]/g, '');
    }
}
