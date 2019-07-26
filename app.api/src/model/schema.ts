/**
 * https://github.com/typeorm/typeorm/blob/master/docs/entities.md
 * https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
 */

import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';
import { DB_SCHEMA_TABLE_NAME } from 'project-minimum-core';

@Entity({ name: DB_SCHEMA_TABLE_NAME })
class SchemaEntity {
    @PrimaryGeneratedColumn()
    public idInternal: number;

    @Column({ type: 'uuid', nullable: false })
    @Generated('uuid')
    public id: string;

    @Column({ type: 'boolean', nullable: false })
    public draft: boolean;

    @Column({ type: 'json', nullable: false })
    public schema: string;

    @Column({ type: 'smallint', default: 0 })
    public version: number;
}

export default SchemaEntity;
