/**
 * https://typeorm.io/#/migrations
 */

import { Table, TableColumn, TableIndex } from 'typeorm';
import { DB_TABLE_PREFIX, DB_REF_TABLE_PREFIX } from '../../constants';
import EntityManager from '../entity-manager';
import { getRefTableName, getTableName } from '../entity-util';

export default class Migrator {
    /**
     * So this function calculates a set of commands that are to execute to set the database in sync with data structure
     * @param params
     * @returns {Promise<void>}
     */
    static async migrate(params = {}) {
        const { schemaProvider, connectionManager } = params;

        const entityManager = new EntityManager(schemaProvider);
        const qr = (await connectionManager.getSystem()).createQueryRunner(
            'master',
        );
        // get all entity tables
        const eTableNames = (await qr.query(
            `select * from information_schema.tables where table_schema='public' and table_name like '${DB_TABLE_PREFIX}%'`,
        )).map(t => t.table_name);

        let tables = [];
        if (_.iane(eTableNames)) {
            tables = await qr.getTables(eTableNames);
        }

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

    static getDatabaseEntity(entity, schemaProvider) {
        const table = {
            name: getTableName(entity),
            columns: [],
            __refs: [],
            __entity: entity,
        };

        // add "system" field: id
        table.columns.push({
            isNullable: false,
            isGenerated: true,
            isPrimary: true,
            isUnique: true,
            isArray: false,
            length: '',
            zerofill: false,
            unsigned: true,
            name: 'id',
            type: 'integer',
            generated: 'increment',
        });

        entity.schema.forEach(field => {
            if (
                schemaProvider.isMultipleField(field) &&
                _.isne(schemaProvider.getReferenceFieldName(field))
            ) {
                // we do not create any fields for many-to-may relation. Instead, a table should be created
                table.__refs.push(field);
                return;
            }

            table.columns.push({
                isNullable: field.required !== true,
                isGenerated: false,
                isPrimary: false,
                isUnique: field.unique === true,
                isArray: _.isArray(field.type),
                length: this.getFieldLength(field, schemaProvider),
                zerofill: false,
                unsigned: false,
                name: field.name,
                type: this.getDatabaseFieldType(field),
            });
        });

        return table;
    }

    static getDatabaseFieldType(field) {
        let type = field.type;

        if (_.isArray(type)) {
            type = type[0] || String;
        }

        if (_.isne(type)) {
            // reference
            return 'integer';
        }

        if (type === Number) {
            return 'integer'; // todo: add float support
        }

        if (type === Boolean) {
            return 'boolean';
        }

        if (type === Date) {
            return 'timestamp without time zone';
        }

        // the rest - just a string type
        return 'character varying';
    }

    static getFieldLength(field, schemaProvider) {
        const length = schemaProvider.getFieldLength(field);
        if (length !== null) {
            return length.toString();
        }

        return '';
    }
}
