/**
 * https://typeorm.io/#/migrations
 */

import { Table, TableColumn, TableIndex } from 'typeorm';
// import md5 from 'md5';
import {
    DB_TABLE_PREFIX,
    DB_IDENTIFIER_LENGTH,
    DB_VARCHAR_DEF_LENGTH,
    DB_CODE_COLUMN_LENGTH,
} from '../constants';

export default class DBDiff {
    /**
     * So this function calculates a set of commands that are to execute to set the database in sync with data structure
     * @param params
     * @returns {Promise<void>}
     */
    static async make(params = {}) {
        const { entityConfigurationProvider, connectionManager } = params;

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

        const entities = await entityConfigurationProvider.get();
        const willBe = {};
        entities.forEach(entity => {
            const table = this.getDDL(entity);
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

    static getDDL(entity) {
        const table = {
            name: this.getTableName(entity),
            columns: [],
        };

        // add two "system" fields: id and code (external code)
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
        table.columns.push({
            isNullable: false,
            isGenerated: false,
            isPrimary: false,
            isUnique: true, // will automatically create a unique index
            isArray: false,
            length: DB_CODE_COLUMN_LENGTH.toString(),
            zerofill: false,
            unsigned: false,
            name: 'code',
            type: 'character varying',
        });

        entity.schema.forEach(field => {
            table.columns.push({
                isNullable: field.required !== true,
                isGenerated: false,
                isPrimary: false,
                isUnique: false,
                isArray: _.isArray(field.type),
                length: this.getDDLLength(field),
                zerofill: false,
                unsigned: false,
                name: field.name,
                type: this.getDDLType(field),
            });
        });

        return table;
    }

    static getDDLType(field) {
        let type = field.type;

        if (_.isArray(type)) {
            type = type[0] || String;
        }

        if (type === 'reference') {
            return 'integer'; // todo: it depends. if the link is multiple, there should be no field at all
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

    static getDDLLength(field) {
        const type = this.getDDLType(field);
        if (type === 'character varying') {
            const length = parseInt(field.length, 10);
            if (isNaN(length)) {
                return DB_VARCHAR_DEF_LENGTH.toString();
            }

            return length.toString();
        }

        return '';
    }

    static getTableName(entity) {
        return `${DB_TABLE_PREFIX}${entity.name.toLowerCase()}`.substr(
            0,
            DB_IDENTIFIER_LENGTH,
        );
    }
}
