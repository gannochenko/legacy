/**
 * https://typeorm.io/#/migrations
 */

import { Table, TableColumn, TableIndex } from 'typeorm';
import {
    DB_TABLE_PREFIX,
    DB_REF_TABLE_PREFIX,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    REFERENCE_ENTITY_PARENT_FIELD_NAME,
    REFERENCE_ENTITY_CHILD_FIELD_NAME,
} from 'project-minimum-core';

import EntityManager from './entity-manager';

export default class Migrator {
    static async getDelta({ schema, connection } = {}) {
        const tables = this.getTables(connection);

        const tablesToCreate = [];
        let tableNamesToDrop = [];
        const tablesToProbablyAlter = [];

        const currentTables = {};
        const futureTables = {};

        tables.forEach(table => {
            currentTables[table.name] = table;
        });

        const entities = schema.getSchema();
        const tableToEntity = {};

        // tables
        entities.forEach(entity => {
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
                tableFutureFieldNames,
                tableCurrentFieldNames,
            );
            const fieldsToDelete = _.difference(
                tableCurrentFieldNames,
                tableFutureFieldNames,
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

        const futureReferences = [];

        // find all refs in future tables
        Object.values(futureTables).forEach(table => {
            const entity = tableToEntity[table.name];
            entity.getMultipleReferences().forEach(field => {
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

    static async migrate(params) {
        const delta = await this.getDelta(params);
    }

    static async getTables(connection) {
        const queryRunner = connection.createQueryRunner('master');
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
