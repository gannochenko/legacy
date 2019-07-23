/**
 * https://github.com/typeorm/typeorm/blob/master/docs/entities.md
 * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DB_SCHEMA_TABLE_NAME } from 'project-minimum-core';

@Entity({ name: DB_SCHEMA_TABLE_NAME })
export default class SchemaEntity {
    @PrimaryGeneratedColumn()
    public id: number | undefined;

    @Column({ type: 'boolean', nullable: false })
    public draft: boolean | undefined;

    @Column({ type: 'json', nullable: false })
    public schema: string | undefined;

    @Column({ type: 'smallint', default: 0 })
    public version: number | undefined;
}
