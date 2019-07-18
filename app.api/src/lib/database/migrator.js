/**
 * https://typeorm.io/#/migrations
 */

import { Table, TableColumn, TableIndex } from 'typeorm';
import {
    DB_TABLE_PREFIX,
    DB_REF_TABLE_PREFIX,
    ENTITY_CODE_FIELD_NAME,
    ENTITY_ID_FIELD_NAME,
    REFERENCE_ENTITY_PARENT_FIELD_NAME,
    REFERENCE_ENTITY_CHILD_FIELD_NAME,
} from 'project-minimum-core';
import { getRefTableName } from '../entity-util';

import EntityManager from './entity-manager';

export default class Migrator {
    static async getDelta({ schema, connectionManager } = {}) {
        const queryRunner = (await connectionManager.getSystem()).createQueryRunner(
            'master',
        );

        const tables = this.getTables(queryRunner);

        const tablesToCreate = [];
        const tablesToDrop = [];
        const tablesToProbablyAlter = [];

        const currentTables = {};
        const futureTables = {};

        tables.forEach(table => {
            currentTables[table.name] = table;
        });

        const entities = schema.getSchema();

        // tables
        entities.forEach(entity => {
            const table = EntityManager.getDDLByEntity(entity);
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
                !table.name.startsWith(DB_REF_TABLE_PREFIX)
            ) {
                tablesToDrop.push(table);
            }
        });

        // fields
        const tablesToAlter = {};

        for (let i = 0; i < tablesToProbablyAlter.length; i += 1) {
            const futureTable = tablesToProbablyAlter[i];
            const currentTable = currentTables[futureTable.name];

            const tableFutureFieldNames = Object.keys(
                futureTable.columns.reduce((result, item) => {
                    result[item.name] = true;
                    return result;
                }, {}),
            );

            const tableCurrentFieldNames = Object.keys(
                currentTable.columns.reduce((result, item) => {
                    result[item.name] = true;
                    return result;
                }, {}),
            );

            const fieldsToAdd = _.difference(
                tableCurrentFieldNames,
                tableFutureFieldNames,
            );
            const fieldsToDelete = _.difference(
                tableFutureFieldNames,
                tableCurrentFieldNames,
            );

            for (let j = 0; j < futureTable.columns.length; j += 1) {
                const field = futureTable.columns[j];
                if (fieldsToAdd.includes(field.name)) {
                    tablesToAlter[futureTable.name] = tablesToAlter[
                        futureTable.name
                    ] || {
                        add: [],
                        delete: [],
                    };
                    tablesToAlter[futureTable.name].add.push(field);
                }
            }

            for (let j = 0; j < currentTable.columns.length; j += 1) {
                const field = currentTable.columns[j];

                if (
                    field.name !== ENTITY_ID_FIELD_NAME &&
                    field.name !== ENTITY_CODE_FIELD_NAME
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

            // references
            const currentReferences = Object.values(currentTables)
                .map(table =>
                    table.name.startsWith(DB_REF_TABLE_PREFIX)
                        ? table.name
                        : false,
                )
                .filter(x => x);

            const refsAdd = [];
            const refsWillBe = [];

            // find all refs in future tables
            Object.values(futureTables).forEach(table => {
                table.__refs.forEach(field => {
                    const refName = getRefTableName(table.__entity, field);
                    refsWillBe.push(refName);

                    if (currentReferences.indexOf(refName) < 0) {
                        refsAdd.push({
                            name: refName,
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

            const refsDrop = _.difference(currentReferences, refsWillBe);

            for (let i = 0; i < refsAdd.length; i++) {
                await qr.createTable(new Table(refsAdd[i]), true);
            }
            for (let i = 0; i < refsDrop.length; i++) {
                await qr.dropTable(refsDrop[i], true);
            }
        }

        return {
            create: tablesToCreate,
            drop: tablesToDrop,
            alter: tablesToAlter,
        };
    }

    /**
     * So this function calculates a set of commands that are to execute to set the database in sync with data structure
     * @param params
     * @returns {Promise<void>}
     */
    static async migrate(params = {}) {
        const { schemaProvider, connectionManager } = params;

        const qr = (await connectionManager.getSystem()).createQueryRunner(
            'master',
        );
        // get all entity tables

        const toCreate = [];
        const toDrop = [];
        const toAlter = [];

        const have = {};
        tables.forEach(table => {
            have[table.name] = table;
        });

        const entities = await schemaProvider.get();
        const willBe = {};
        entities.forEach(entity => {
            const table = this.getDatabaseEntity(
                entity,
                schemaProvider,
                entityManager,
            );
            willBe[table.name] = table;
            if (!(table.name in have)) {
                toCreate.push(table);
            } else {
                toAlter.push(table);
            }
        });

        // tables to drop
        Object.values(have).forEach(table => {
            if (
                !(table.name in willBe) &&
                !table.name.startsWith(DB_REF_TABLE_PREFIX)
            ) {
                toDrop.push(table);
            }
        });

        if (_.iane(toCreate)) {
            for (let i = 0; i < toCreate.length; i++) {
                const table = toCreate[i];
                await qr.createTable(new Table(table), true);
                // await qr.createIndex(table.name, new TableIndex({
                //     name: `${DB_INDEX_PREFIX}_${md5(table.name)}_code`,
                //     columnNames: ['code']
                // }));
            }
        }

        if (_.iane(toDrop)) {
            for (let i = 0; i < toDrop.length; i++) {
                await qr.dropTable(toDrop[i], true);
            }
        }

        // now the "field" level
        for (let i = 0; i < toAlter.length; i++) {
            const table = toAlter[i];
            const cTable = have[table.name];

            const tableFNames = Object.keys(
                table.columns.reduce((result, item) => {
                    result[item.name] = true;
                    return result;
                }, {}),
            );

            const cTableFNames = Object.keys(
                cTable.columns.reduce((result, item) => {
                    result[item.name] = true;
                    return result;
                }, {}),
            );

            const fAdd = _.difference(tableFNames, cTableFNames);
            const fDel = _.difference(cTableFNames, tableFNames);

            for (let i = 0; i < table.columns.length; i++) {
                const field = table.columns[i];
                if (fAdd.indexOf(field.name) >= 0) {
                    await qr.addColumn(table.name, new TableColumn(field));
                }
            }

            for (let i = 0; i < cTable.columns.length; i++) {
                const field = cTable.columns[i];

                if (field.name === 'id' || field.name === 'code') {
                    // don't drop, these are system columns
                    continue;
                }

                if (fDel.indexOf(field.name) >= 0) {
                    await qr.dropColumn(cTable.name, field.name);
                }
            }

            // todo: support altering of fields
        }

        // dealing with refs
        const refsHave = Object.values(have)
            .map(table =>
                table.name.startsWith(DB_REF_TABLE_PREFIX) ? table.name : false,
            )
            .filter(x => x);
        const refsAdd = [];
        const refsWillBe = [];

        // find all refs in willBe
        Object.values(willBe).forEach(table => {
            table.__refs.forEach(field => {
                const refName = getRefTableName(table.__entity, field);
                refsWillBe.push(refName);

                if (refsHave.indexOf(refName) < 0) {
                    refsAdd.push({
                        name: refName,
                        columns: [
                            {
                                name: 'self',
                                isNullable: false,
                                isPrimary: true,
                                type: 'integer',
                            },
                            {
                                name: 'rel',
                                isNullable: false,
                                isPrimary: true,
                                type: 'integer',
                            },
                        ],
                    });
                }
            });
        });

        const refsDrop = _.difference(refsHave, refsWillBe);

        for (let i = 0; i < refsAdd.length; i++) {
            await qr.createTable(new Table(refsAdd[i]), true);
        }
        for (let i = 0; i < refsDrop.length; i++) {
            await qr.dropTable(refsDrop[i], true);
        }
    }

    static async getTables(queryRunner) {
        const entityTableNames = (await queryRunner.query(
            `select * from information_schema.tables where table_schema='public' and table_name like '${DB_TABLE_PREFIX}%'`,
        )).map(t => t.table_name);

        let tables = [];
        if (entityTableNames.length) {
            tables = await queryRunner.getTables(entityTableNames);
        }

        return tables;
    }
}
