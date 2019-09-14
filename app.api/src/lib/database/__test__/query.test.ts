/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import {
    DB_QUERY_FIND_MAX_PAGE_SIZE,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    Schema,
} from '@project-minimum/core';
import { Query } from '../query';
import schemaJSON from '../../../__test__/schema';

let schema: Schema;

// @ts-ignore
describe('Query', () => {
    beforeAll(async () => {
        schema = new Schema({
            schema: schemaJSON,
            version: 2,
        });
    });
    // beforeEach(async () => {
    // });
    // afterEach(async () => {
    // });
    describe('prepareOrderBy()', () => {
        it('should disallow illegal fields', async () => {
            const entity = schema.getEntity('important_person');

            const order = Query.prepareOrderBy(entity, { test: 'ASC' });
            expect(order).toEqual({});
        });
        it('should allow legal fields', async () => {
            const entity = schema.getEntity('important_person');

            // eslint-disable-next-line @typescript-eslint/camelcase
            const order = Query.prepareOrderBy(entity, { full_name: 'ASC' });
            // eslint-disable-next-line @typescript-eslint/camelcase
            expect(order).toMatchObject({ full_name: 'ASC' });
        });
        it('should attach table alias', async () => {
            const entity = schema.getEntity('important_person');

            // eslint-disable-next-line @typescript-eslint/camelcase
            const order = Query.prepareOrderBy(
                entity,
                { full_name: 'ASC' },
                { alias: 'foo' },
            );
            expect(order).toMatchObject({ 'foo.full_name': 'ASC' });
        });
        it('should disallow unsortable fields', async () => {
            const entity = schema.getEntity('important_person');

            // eslint-disable-next-line @typescript-eslint/camelcase
            const order = Query.prepareOrderBy(entity, { pets: 'ASC' });
            expect(order).toMatchObject({});
        });
    });
    describe('prepareSelect()', () => {
        it('should return minimal select', async () => {
            const entity = schema.getEntity('important_person');

            const select = Query.prepareSelect(entity, []);
            expect(select).toEqual([
                ENTITY_PK_FIELD_NAME,
                ENTITY_ID_FIELD_NAME,
            ]);
        });
        it('should disallow illegal fields', async () => {
            const entity = schema.getEntity('important_person');

            const select = Query.prepareSelect(entity, ['test']);
            expect(select).toEqual([
                ENTITY_PK_FIELD_NAME,
                ENTITY_ID_FIELD_NAME,
            ]);
        });
        it('should allow legal fields', async () => {
            const entity = schema.getEntity('important_person');

            const select = Query.prepareSelect(entity, ['full_name']);
            expect(select).toEqual([
                'full_name',
                ENTITY_PK_FIELD_NAME,
                ENTITY_ID_FIELD_NAME,
            ]);
        });
        it('should disallow unselectable fields', async () => {
            const entity = schema.getEntity('important_person');

            const select = Query.prepareSelect(entity, ['pets', 'partner']);
            expect(select).toEqual([
                'partner',
                ENTITY_PK_FIELD_NAME,
                ENTITY_ID_FIELD_NAME,
            ]);
        });
        it('should attach table alias', async () => {
            const entity = schema.getEntity('important_person');

            const select = Query.prepareSelect(entity, ['full_name'], {
                alias: 'foo',
            });
            expect(select).toEqual([
                'foo.full_name',
                `foo.${ENTITY_PK_FIELD_NAME}`,
                `foo.${ENTITY_ID_FIELD_NAME}`,
            ]);
        });
    });
    describe('prepareLimitOffset()', () => {
        it('should work', async () => {
            const result = Query.prepareLimitOffset({ limit: 1, offset: 1 });

            expect(result).toMatchObject({ limit: 1, offset: 1 });
        });
        it('should set limit', async () => {
            const result = Query.prepareLimitOffset({ offset: 1 });

            expect(result).toEqual({
                limit: DB_QUERY_FIND_MAX_PAGE_SIZE,
                offset: 1,
            });
        });
        it('should not set limit', async () => {
            const result = Query.prepareLimitOffset(
                { offset: 1 },
                { restrictLimit: false },
            );

            expect(result).toEqual({ offset: 1 });
        });
    });
});
