/**
 * https://typeorm.io/#/migrations
 */

import { Table, TableColumn, TableIndex } from 'typeorm';
// import md5 from 'md5';
import { DB_TABLE_PREFIX } from '../constants';
import EntityManager from './entity-manager';

export default class Migrator {
    /**
     * So this function calculates a set of commands that are to execute to set the database in sync with data structure
     * @param params
     * @returns {Promise<void>}
     */
    static async migrate(params = {}) {
        const { schemaProvider, connectionManager } = params;

        const entityManager = new EntityManager(schemaProvider);
        const qr = (await (await connectionManager.getSimple()).getRaw()).createQueryRunner(
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
            if (!(table.name in willBe)) {
                toDrop.push(table);
            }
        });

        if (_.iane(toCreate)) {
            for (let i = 0; i < toCreate.length; i++) {
                const table = toCreate[i];
                console.dir(table);
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
    }

    static getDatabaseEntity(entity, schemaProvider, entityManager) {
        const table = {
            name: entityManager.getTableName(entity),
            columns: [],
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
