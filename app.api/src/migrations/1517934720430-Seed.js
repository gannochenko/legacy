import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import { DB_SCHEMA_TABLE_NAME } from '../constants';

/**
 * https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
 */
export class Seed1517934720430 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: DB_SCHEMA_TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isNullable: false,
                    isGenerated: true,
                    isPrimary: true,
                    isUnique: true,
                    isArray: false,
                    length: '',
                    zerofill: false,
                    unsigned: true,
                    generated: 'increment',
                },
                {
                    name: 'draft',
                    type: 'boolean',
                    isNullable: false,
                    isGenerated: false,
                    isPrimary: false,
                    isUnique: false,
                    isArray: false,
                    length: '',
                    zerofill: false,
                    unsigned: true,
                },
                {
                    name: 'structure',
                    type: 'json',
                    isNullable: false,
                    isGenerated: false,
                    isPrimary: false,
                    isUnique: false,
                    isArray: false,
                    length: '',
                    zerofill: false,
                    unsigned: true,
                },
            ],
        }), true);

        // todo: users
        // todo: groups

        logger.info('🌱 Seed migration applied');
    }
    async down(queryRunner) {}
}
