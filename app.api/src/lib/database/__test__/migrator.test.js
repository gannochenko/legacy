/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import Migrator from '../migrator';
import schemaData from '../../../__test__/schema';
import { Schema } from 'project-minimum-core';

describe('Migrator', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    // afterEach(async () => {
    // });
    describe('getDelta()', () => {
        it('should detect tables to create', async () => {
            const schema = new Schema({ schema: schemaData, connection: null });

            const spy = jest.spyOn(Migrator, 'getTables');
            spy.mockImplementationOnce(() => []);

            const delta = await Migrator.getDelta({ schema });

            expect(delta.create).toHaveLength(5);
            expect(delta.create).toMatchSnapshot();

            expect(delta.alter).toEqual({});
            expect(delta.drop).toEqual([]);
        });
        it('should detect tables to drop', async () => {
            const schema = new Schema({ schema: schemaData, connection: null });

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

            const delta = await Migrator.getDelta({ schema });

            expect(delta.alter).toEqual({});
            expect(delta.drop).toEqual(['foo', 'bar']);
        });
        it('should detect tables to alter', async () => {
            const schema = new Schema({ schema: schemaData, connection: null });

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

            const delta = await Migrator.getDelta({ schema });

            expect(Object.keys(delta.alter)).toHaveLength(2);
            expect(delta.alter['eq_e_important_person']).toBeDefined();
            expect(delta.alter['eq_e_pet']).toBeDefined();

            expect(delta.alter).toMatchSnapshot();
        });
    });
});
