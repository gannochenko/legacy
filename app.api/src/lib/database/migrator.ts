/**
 * https://typeorm.io/#/migrations
 */

import { Connection, Table, TableColumn } from 'typeorm';
import { TableOptions } from 'typeorm/schema-builder/options/TableOptions';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import _ from '@bucket-of-bolts/microdash';

import {
    DB_TABLE_PREFIX,
    DB_REF_TABLE_PREFIX,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    REFERENCE_ENTITY_PARENT_FIELD_NAME,
    REFERENCE_ENTITY_CHILD_FIELD_NAME,
    Schema,
    Entity,
} from '@project-minimum/core';
import EntityManager from './entity-manager';
import { Field } from '../project-minimum-core';

interface MigratorParameters {
    schema: Schema;
    connection: Connection;
}

export default class Migrator {
    public static async getDelta({ schema, connection }: MigratorParameters) {
        const tables = await this.getTables(connection);

        const tablesToCreate: TableOptions[] = [];
        let tableNamesToDrop: string[] = [];
        const tablesToProbablyAlter: TableOptions[] = [];

        const currentTables: StringMap<Table> = {};
        const futureTables: StringMap<TableOptions> = {};

        tables.forEach(table => {
            currentTables[table.name] = table;
        });

        const entities = schema.getSchema();
        const tableToEntity: StringMap<Entity> = {};

        // tables
        entities.forEach((entity: Entity) => {
            const table = EntityManager.getDDLByEntity(entity);
            tableToEntity[table.name] = entity;
            futureTables[table.name] = table;
            if (!(table.name in currentTables)) {
                tablesToCreate.push(table);
            } else {
                tablesToProbablyAlter.push(table);
            }
        });

        Object.values(currentTables).forEach(table => {
            if (
                !(table.name in futureTables) &&
                !table.name.startsWith(DB_REF_TABLE_PREFIX) // not a reference
            ) {
                tableNamesToDrop.push(table.name);
            }
        });

        // fields
        const tablesToAlter: StringMap<{
            add: TableColumnOptions[];
            delete: TableColumnOptions[];
        }> = {};

        for (let i = 0; i < tablesToProbablyAlter.length; i += 1) {
            const futureTable = tablesToProbablyAlter[i];
            const currentTable = currentTables[futureTable.name];

            let tableFutureFieldNames: string[] = [];
            if (futureTable.columns) {
                tableFutureFieldNames = Object.keys(
                    futureTable.columns.reduce(
                        (result: StringMap<boolean>, item) => {
                            result[item.name] = true;
                            return result;
                        },
                        {},
                    ),
                );
            }

            const tableCurrentFieldNames = Object.keys(
                currentTable.columns.reduce(
                    (result: StringMap<boolean>, item) => {
                        result[item.name] = true;
                        return result;
                    },
                    {},
                ),
            );

            const fieldsToAdd = _.difference(
                tableFutureFieldNames,
                tableCurrentFieldNames,
            );
            const fieldsToDelete = _.difference(
                tableCurrentFieldNames,
                tableFutureFieldNames,
            );

            if (futureTable.columns) {
                for (let j = 0; j < futureTable.columns.length; j += 1) {
                    const field = futureTable.columns[j];
                    if (fieldsToAdd.includes(field.name)) {
                        if (!tablesToAlter[futureTable.name]) {
                            tablesToAlter[futureTable.name] = {
                                add: [],
                                delete: [],
                            };
                        }
                        tablesToAlter[futureTable.name].add.push(field);
                    }
                }
            }

            for (let j = 0; j < currentTable.columns.length; j += 1) {
                const field = currentTable.columns[j];

                if (
                    field.name !== ENTITY_PK_FIELD_NAME &&
                    field.name !== ENTITY_ID_FIELD_NAME
                ) {
                    if (fieldsToDelete.includes(field.name)) {
                        tablesToAlter[currentTable.name] = tablesToAlter[
                            currentTable.name
                        ] || {
                            add: [],
                            delete: [],
                        };
                        tablesToAlter[currentTable.name].delete.push(field);
                    }
                }
            }

            // todo: support altering of fields
        }

        // references
        const currentReferences = Object.values(currentTables)
            .map(table =>
                table.name.startsWith(DB_REF_TABLE_PREFIX) ? table.name : false,
            )
            .filter(x => x);

        const futureReferences: string[] = [];

        // find all refs in future tables
        Object.values(futureTables).forEach(table => {
            const entity = tableToEntity[table.name];
            entity.getMultipleReferences().forEach((field: Field) => {
                const referenceTableName = EntityManager.getReferenceTableName(
                    entity,
                    field,
                );
                futureReferences.push(referenceTableName);

                if (!currentReferences.includes(referenceTableName)) {
                    tablesToCreate.push({
                        name: referenceTableName,
                        columns: [
                            {
                                name: REFERENCE_ENTITY_PARENT_FIELD_NAME,
                                isNullable: false,
                                isPrimary: true,
                                type: 'integer',
                            },
                            {
                                name: REFERENCE_ENTITY_CHILD_FIELD_NAME,
                                isNullable: false,
                                isPrimary: true,
                                type: 'integer',
                            },
                        ],
                    });
                }
            });
        });

        tableNamesToDrop = _.union(
            tableNamesToDrop,
            _.difference(currentReferences, futureReferences),
        );

        return {
            create: tablesToCreate,
            drop: tableNamesToDrop,
            alter: tablesToAlter,
        };
    }

    public static async apply(params: MigratorParameters) {
        const delta = await this.getDelta(params);
        const { connection } = params;
        const queryRunner = connection.createQueryRunner('master');

        // create
        if (delta.create.length) {
            await Promise.all(
                delta.create.map(table =>
                    queryRunner.createTable(new Table(table), true),
                ),
            );
        }

        // drop
        if (delta.drop.length) {
            await Promise.all(
                delta.drop.map(tableName =>
                    queryRunner.dropTable(tableName, true),
                ),
            );
        }

        // alter
        if (Object.keys(delta.alter).length) {
            await Promise.all(
                Object.keys(delta.alter).map(tableName => {
                    const { add, delete: del } = delta.alter[tableName];

                    return Promise.all([
                        Promise.all(
                            add.map(column =>
                                queryRunner.addColumn(
                                    tableName,
                                    new TableColumn(column),
                                ),
                            ),
                        ),
                        Promise.all(
                            del.map(column =>
                                queryRunner.dropColumn(tableName, column.name),
                            ),
                        ),
                    ]);
                }),
            );
        }
    }

    private static async getTables(connection: Connection) {
        const queryRunner = connection.createQueryRunner('master');
        const entityTableNames = (await queryRunner.query(
            `select * from information_schema.tables where table_schema='public' and table_name like '${DB_TABLE_PREFIX}%'`,
        )).map((table: { table_name: string }) => table.table_name);

        let tables: Table[] = [];
        if (entityTableNames.length) {
            tables = await queryRunner.getTables(entityTableNames);
        }

        return tables;
    }
}
