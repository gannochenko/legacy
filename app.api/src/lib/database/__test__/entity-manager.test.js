/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import { EntitySchema } from 'typeorm';
import EntityManager from '../entity-manager';
import { Schema } from 'project-minimum-core';
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
    it('should return table name', async () => {
        const person = schema.getEntity('important_person');
        expect(EntityManager.getTableName(person)).toEqual(
            'eq_e_important_person',
        );
    });
    it('should return reference name', async () => {
        const person = schema.getEntity('important_person');
        const field = person
            .getFields()
            .find(field => field.getName() === 'partner');
        expect(EntityManager.getRefName(person, field)).toEqual(
            'important_person_2_partner',
        );
    });
    it('should return reference table name', async () => {
        const person = schema.getEntity('important_person');
        const field = person
            .getFields()
            .find(field => field.getName() === 'partner');
        expect(EntityManager.getRefTableName(person, field)).toEqual(
            'eq_ref_45ccc121bbf86594e7decf47a5d36df4',
        );
    });
    it('should return database types', async () => {
        const person = schema.getEntity('important_person');

        const referenceField = person
            .getFields()
            .find(field => field.getName() === 'partner');
        expect(EntityManager.getDBType(referenceField)).toEqual('string');

        const booleanField = person
            .getFields()
            .find(field => field.getName() === 'has_pets');
        expect(EntityManager.getDBType(booleanField)).toEqual('boolean');

        const dateField = person
            .getFields()
            .find(field => field.getName() === 'birth_date');
        expect(EntityManager.getDBType(dateField)).toEqual('timestamp');

        const integerField = person
            .getFields()
            .find(field => field.getName() === 'lucky_numbers');
        expect(EntityManager.getDBType(integerField)).toEqual('integer');
    });
    it('should return database entities against the schema', async () => {
        const manager = new EntityManager(schema);
        const entities = await manager.get();

        expect(entities.important_person).toBeInstanceOf(EntitySchema);
        expect(entities.important_person_2_pets).toBeInstanceOf(EntitySchema);
        expect(entities.important_person_2_tools).toBeInstanceOf(EntitySchema);
        expect(entities.pet).toBeInstanceOf(EntitySchema);
        expect(entities.tool).toBeInstanceOf(EntitySchema);

        // check important_person
        expect(entities.important_person.options).toMatchObject({
            name: 'eq_e_important_person',
            columns: {
                id: {
                    primary: true,
                    type: 'integer',
                    generated: 'increment',
                    nullable: false,
                },
                code: {
                    type: 'varchar',
                    nullable: true,
                    array: false,
                    length: 36,
                },
                full_name: {
                    type: 'varchar',
                    nullable: false,
                    array: false,
                    length: 255,
                },
                tags: { type: 'varchar', nullable: true, array: true },
                lucky_numbers: { type: 'integer', nullable: true, array: true },
                birth_date: { type: 'timestamp', nullable: true, array: false },
                has_pets: { type: 'boolean', nullable: true, array: false },
                partner: { type: 'integer', nullable: true, array: false },
            },
        });

        expect(entities.important_person_2_pets.options).toMatchObject({
            name: 'eq_ref_ba4ed80327568d335915e4452eb0703a',
            columns: {
                self: { type: 'integer', nullable: false, primary: true },
                rel: { type: 'integer', nullable: false, primary: true },
            },
        });
    });
});
