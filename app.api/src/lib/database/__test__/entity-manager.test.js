/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import { EntitySchema } from 'typeorm';
import EntityManager from '../entity-manager';
import {
    Schema,
    Field,
    ENTITY_ID_FIELD_NAME,
    ENTITY_PK_FIELD_NAME,
    // @ts-ignore
} from 'project-minimum-core';
import schemaJSON from '../../../__test__/schema';

let schema = null;

describe('DatabaseEntityManager', () => {
    beforeAll(async () => {
        schema = new Schema({
            schema: schemaJSON,
            draft: true,
            version: 2,
        });
    });
    // beforeEach(async () => {
    // });

    describe('getName()', () => {
        it('should return name', async () => {
            const person = schema.getEntity('important_person');
            expect(EntityManager.getName(person)).toEqual('important_person');
            const singleReference = person
                .getFields()
                .find(field => field.getName() === 'partner');
            expect(EntityManager.getName(person, singleReference)).toEqual(
                'important_person',
            );
            const multipleReference = person
                .getFields()
                .find(field => field.getName() === 'pets');
            expect(EntityManager.getName(person, multipleReference)).toEqual(
                'important_person_2_pets',
            );
        });
    });
    describe('getTableName()', () => {
        it('should return table name', async () => {
            const person = schema.getEntity('important_person');
            expect(EntityManager.getTableName(person)).toEqual(
                'eq_e_important_person',
            );
        });
    });
    describe('getReferenceTableName()', () => {
        it('should return reference table name', async () => {
            const person = schema.getEntity('important_person');
            const field = person
                .getFields()
                .find(field => field.getName() === 'partner');
            expect(EntityManager.getReferenceTableName(person, field)).toEqual(
                'eq_ref_45ccc121bbf86594e7decf47a5d36df4',
            );
        });
    });
    describe('getDBType()', () => {
        it('should return database types', async () => {
            const person = schema.getEntity('important_person');

            const referenceField = person
                .getFields()
                .find(field => field.getName() === 'partner');
            expect(EntityManager.getDBType(referenceField)).toEqual('integer');

            const booleanField = person
                .getFields()
                .find(field => field.getName() === 'has_pets');
            expect(EntityManager.getDBType(booleanField)).toEqual('boolean.ts');

            const dateField = person
                .getFields()
                .find(field => field.getName() === 'birth_date');
            expect(EntityManager.getDBType(dateField)).toEqual('timestamp');

            const integerField = person
                .getFields()
                .find(field => field.getName() === 'lucky_numbers');
            expect(EntityManager.getDBType(integerField)).toEqual('integer');
        });
    });
    describe('getEntity()', () => {
        it('should return db entity by definition', async () => {
            const manager = new EntityManager(schema);
            const person = schema.getEntity('important_person');
            const dbPerson = await manager.getByDefinition(person);
            expect(dbPerson).toBeInstanceOf(EntitySchema);

            const singleReference = person
                .getFields()
                .find(field => field.getName() === 'partner');

            const dbPerson2Partner = await manager.getByDefinition(
                person,
                singleReference,
            );
            expect(dbPerson2Partner).toBeInstanceOf(EntitySchema);

            const multipleReference = person
                .getFields()
                .find(field => field.getName() === 'pets');
            const dbPerson2Pets = await manager.getByDefinition(
                person,
                multipleReference,
            );
            expect(dbPerson2Pets).toBeInstanceOf(EntitySchema);
        });
    });
    describe('get()', () => {
        it('should return database entities against the schema', async () => {
            const manager = new EntityManager(schema);
            const entities = await manager.get();

            expect(entities.important_person).toBeInstanceOf(EntitySchema);
            expect(entities.important_person_2_pets).toBeInstanceOf(
                EntitySchema,
            );
            expect(entities.important_person_2_tools).toBeInstanceOf(
                EntitySchema,
            );
            expect(entities.pet).toBeInstanceOf(EntitySchema);
            expect(entities.tool).toBeInstanceOf(EntitySchema);
        });

        it('should handle empty schema correctly', async () => {
            const manager = new EntityManager(new Schema({}));
            const entities = await manager.get();

            expect(entities).toEqual({});
        });
    });
    describe('getByName()', () => {
        it('should return database entities against the schema', async () => {
            const manager = new EntityManager(schema);

            // check important_person
            expect(
                (await manager.getByName('important_person')).options,
            ).toMatchObject({
                name: 'eq_e_important_person',
                columns: {
                    [ENTITY_PK_FIELD_NAME]: {
                        primary: true,
                        type: 'integer',
                        generated: 'increment',
                        nullable: false,
                    },
                    [ENTITY_ID_FIELD_NAME]: {
                        type: 'uuid',
                        nullable: true,
                        array: false,
                        length: undefined,
                    },
                    full_name: {
                        type: 'varchar',
                        nullable: false,
                        array: false,
                        length: 255,
                    },
                    tags: { type: 'varchar', nullable: true, array: true },
                    lucky_numbers: {
                        type: 'integer',
                        nullable: true,
                        array: true,
                    },
                    birth_date: {
                        type: 'timestamp',
                        nullable: true,
                        array: false,
                    },
                    has_pets: {
                        type: 'boolean.ts',
                        nullable: true,
                        array: false,
                    },
                    partner: { type: 'integer', nullable: true, array: false },
                },
            });

            expect(
                (await manager.getByName('important_person_2_pets')).options,
            ).toMatchObject({
                name: 'eq_ref_ba4ed80327568d335915e4452eb0703a',
                columns: {
                    self: { type: 'integer', nullable: false, primary: true },
                    rel: { type: 'integer', nullable: false, primary: true },
                },
            });
        });
    });

    describe('getDDLByEntity()', () => {
        it('should return DDL structure', async () => {
            const entity = schema.getEntity('important_person');

            expect(EntityManager.getDDLByEntity(entity)).toMatchSnapshot();
        });
    });
});
