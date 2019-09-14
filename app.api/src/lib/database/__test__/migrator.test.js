/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import { Table } from 'typeorm';
import { Schema } from '@project-minimum/core';
import Migrator from '../migrator';
import schemaData from '../../../__test__/schema';
import { makeConnection } from '../../../__test__/repository.mock';

let connection = null;

describe('Migrator', () => {
    beforeAll(async () => {
        connection = makeConnection();
    });
    beforeEach(async () => {
        connection.mockClear();
    });
    describe('getDelta()', () => {
        it('should detect tables to create', async () => {
            const schema = new Schema({ schema: schemaData });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => []);

            const delta = await Migrator.getDelta({ schema, connection: null });

            expect(delta.create).toHaveLength(5);
            expect(delta.create).toMatchSnapshot();

            expect(delta.alter).toEqual({});
            expect(delta.drop).toEqual([]);
        });
        it('should detect tables to drop', async () => {
            const schema = new Schema({ schema: schemaData });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => [
                {
                    name: 'foo',
                    columns: [],
                },
                {
                    name: 'bar',
                    columns: [],
                },
            ]);

            const delta = await Migrator.getDelta({ schema, connection: null });

            expect(delta.alter).toEqual({});
            expect(delta.drop).toEqual(['foo', 'bar']);
        });
        it('should detect tables to alter', async () => {
            const schema = new Schema({ schema: schemaData });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => [
                {
                    name: 'eq_e_important_person',
                    columns: [
                        {
                            isNullable: false,
                            isGenerated: false,
                            isPrimary: false,
                            isUnique: false,
                            isArray: false,
                            length: 255,
                            zerofill: false,
                            unsigned: false,
                            name: 'full_name',
                            type: 'varchar',
                        },
                        {
                            isNullable: false,
                            isGenerated: false,
                            isPrimary: false,
                            isUnique: false,
                            isArray: false,
                            length: 255,
                            zerofill: false,
                            unsigned: false,
                            name: 'something_else',
                            type: 'varchar',
                        },
                    ],
                },
                {
                    name: 'eq_e_pet',
                    columns: [
                        {
                            isNullable: false,
                            isGenerated: false,
                            isPrimary: false,
                            isUnique: false,
                            isArray: false,
                            length: 255,
                            zerofill: false,
                            unsigned: false,
                            name: 'something_else',
                            type: 'varchar',
                        },
                    ],
                },
            ]);

            const delta = await Migrator.getDelta({ schema, connection: null });

            expect(Object.keys(delta.alter)).toHaveLength(2);
            expect(delta.alter['eq_e_important_person']).toBeDefined();
            expect(delta.alter['eq_e_pet']).toBeDefined();

            expect(delta.alter).toMatchSnapshot();
        });
    });

    describe('apply()', () => {
        it('should create tables', async () => {
            const schema = new Schema({ schema: schemaData });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => []);

            await Migrator.apply({ schema, connection });

            const queryRunner = connection.createQueryRunner();
            const calls = queryRunner.createTable.mock.calls;

            expect(calls).toHaveLength(5);

            expect(calls[0][0]).toBeInstanceOf(Table);
            expect(calls[0][0].name).toEqual('eq_e_important_person');
            expect(JSON.stringify(calls[0][0].columns)).toMatchSnapshot();

            expect(calls[1][0]).toBeInstanceOf(Table);
            expect(calls[1][0].name).toEqual('eq_e_pet');
            expect(JSON.stringify(calls[1][0].columns)).toMatchSnapshot();

            expect(calls[2][0]).toBeInstanceOf(Table);
            expect(calls[2][0].name).toEqual('eq_e_tool');
            expect(JSON.stringify(calls[2][0].columns)).toMatchSnapshot();

            expect(calls[3][0]).toBeInstanceOf(Table);
            expect(calls[3][0].name).toEqual(
                'eq_ref_ba4ed80327568d335915e4452eb0703a',
            );
            expect(JSON.stringify(calls[3][0].columns)).toMatchSnapshot();

            expect(calls[4][0]).toBeInstanceOf(Table);
            expect(calls[4][0].name).toEqual(
                'eq_ref_b1fb992f85e4af08fa10b2256811daae',
            );
            expect(JSON.stringify(calls[4][0].columns)).toMatchSnapshot();
        });
        it('should drop tables', async () => {
            const schema = new Schema({ schema: schemaData });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => [
                {
                    name: 'foo',
                    columns: [],
                },
                {
                    name: 'bar',
                    columns: [],
                },
            ]);

            await Migrator.apply({ schema, connection });

            const queryRunner = connection.createQueryRunner();
            const calls = queryRunner.dropTable.mock.calls;

            expect(calls).toEqual([['foo', true], ['bar', true]]);
        });
        it('should alter tables', async () => {
            const schema = new Schema({ schema: schemaData });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => [
                {
                    name: 'eq_e_important_person',
                    columns: [
                        {
                            isNullable: false,
                            isGenerated: false,
                            isPrimary: false,
                            isUnique: false,
                            isArray: false,
                            length: 255,
                            zerofill: false,
                            unsigned: false,
                            name: 'full_name',
                            type: 'varchar',
                        },
                        {
                            isNullable: false,
                            isGenerated: false,
                            isPrimary: false,
                            isUnique: false,
                            isArray: false,
                            length: 255,
                            zerofill: false,
                            unsigned: false,
                            name: 'something_else',
                            type: 'varchar',
                        },
                    ],
                },
                {
                    name: 'eq_e_pet',
                    columns: [
                        {
                            isNullable: false,
                            isGenerated: false,
                            isPrimary: false,
                            isUnique: false,
                            isArray: false,
                            length: 255,
                            zerofill: false,
                            unsigned: false,
                            name: 'something_else',
                            type: 'varchar',
                        },
                    ],
                },
            ]);

            await Migrator.apply({ schema, connection });

            const queryRunner = connection.createQueryRunner();
            const callsAdd = queryRunner.addColumn.mock.calls;
            const callsDel = queryRunner.dropColumn.mock.calls;

            expect(callsAdd).toHaveLength(10);
            expect(callsDel).toEqual([
                ['eq_e_important_person', 'something_else'],
                ['eq_e_pet', 'something_else'],
            ]);
        });
    });
});
