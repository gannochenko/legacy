/**
 * https://github.com/typeorm/typeorm/blob/master/docs/entities.md
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

    @Column({ type: 'number', default: 0 })
    public version: number | undefined;
}

// const schema = {
//     name: DB_SCHEMA_TABLE_NAME,
//     columns: {
//         id: {
//             primary: true,
//             type: 'integer',
//             generated: 'increment',
//             nullable: false,
//         },
//         draft: {
//             type: 'boolean',
//             nullable: false,
//         },
//         schema: {
//             type: 'json',
//             nullable: false,
//         },
//         version: {
//             type: 'integer',
//             defaultValue: 0,
//         },
//     },
// };
// export default new EntitySchema(schema);
