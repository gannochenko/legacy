import { MigrationInterface, QueryRunner } from 'typeorm';
// @ts-ignore
import { logger } from 'ew-internals';
import {
    ENTITY_ID_FIELD_NAME,
    ENTITY_ID_FIELD_LENGTH,
    // @ts-ignore
} from 'project-minimum-core';
import SchemaEntity from '../model/schema';

/**
 * https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
 */
export class Seed1517934720430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner) {
        await queryRunner.connection.synchronize(false);

        if (process.env.NODE_ENV === 'development') {
            const repository = queryRunner.connection.getRepository(
                SchemaEntity,
            );
            const current = await repository.find({ where: { draft: false } });
            if (!current.length) {
                const schema = new SchemaEntity();
                schema.draft = false;
                schema.version = 1;
                // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
                schema.declaration = demoSchema;

                await repository.save(schema);
            }
        }

        logger.info('🌱 Seed migration applied');
    }

    // eslint-disable-next-line no-empty-function
    public async down() {}
}

const demoSchema = [
    {
        name: 'important_person',
        schema: [
            {
                name: ENTITY_ID_FIELD_NAME,
                type: 'string',
                label: 'Id',
                length: ENTITY_ID_FIELD_LENGTH,
                unique: true,
                system: true,
            },
            {
                name: 'full_name',
                type: 'string',
                label: 'Full name',
                required: true,
            },
            { name: 'tags', type: ['string'], label: 'Tags' },
            {
                name: 'lucky_numbers',
                type: ['integer'],
                label: 'Lucky numbers',
            },
            { name: 'birth_date', type: 'datetime', label: 'Birth date' },
            { name: 'has_pets', type: 'boolean', label: 'Has pets' },
            { name: 'pets', type: ['pet'], label: 'Pets' },
            { name: 'tools', type: ['tool'], label: 'Tools' },
            { name: 'partner', type: 'important_person', label: 'Partner' },
        ],
    },
    {
        name: 'pet',
        schema: [
            {
                name: ENTITY_ID_FIELD_NAME,
                type: 'string',
                label: 'Id',
                length: ENTITY_ID_FIELD_LENGTH,
                unique: true,
                system: true,
            },
            {
                name: 'nickname',
                type: 'string',
                label: 'Nickname',
                required: true,
            },
        ],
    },
    {
        name: 'tool',
        schema: [
            {
                name: ENTITY_ID_FIELD_NAME,
                type: 'string',
                label: 'Id',
                length: ENTITY_ID_FIELD_LENGTH,
                unique: true,
                system: true,
            },
            { name: 'name', type: 'string', label: 'Name', required: true },
        ],
    },
];
