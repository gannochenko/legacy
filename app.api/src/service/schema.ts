// @ts-ignore
import { Schema } from 'project-minimum-core';
import SchemaEntity from '../model/schema';
import ConnectionManager from '../lib/database/connection-manager';

export type SchemaType = 'draft' | 'actual';

class SchemaService {
    public static async load(
        type: SchemaType,
        connectionManager: ConnectionManager,
    ): Promise<Schema> {
        const connection = await connectionManager.getSystem();

        const schema = await connection.getRepository(SchemaEntity).findOne({
            draft: type === 'draft',
        });

        return new Schema(schema || {});
    }

    public static async put(
        type: SchemaType,
        schema: Schema,
        connectionManager: ConnectionManager,
    ): Promise<object[]> {
        const errors = await schema.getHealth();
        if (!_.isArrayNotEmpty(errors)) {
            const connection = await connectionManager.getSystem();
            const repo = connection.getRepository(SchemaEntity);

            // get current
            let current = await connection.getRepository(SchemaEntity).findOne({
                draft: false,
            });
            if (current) {
                const currentSchema = new Schema(current);
                // have current => update
                repo.merge(current, {
                    version: currentSchema.getVersion() + 1,
                    declaration: schema.getSchema(),
                });
            } else {
                // else => create
                current = repo.create({
                    draft: false,
                    version: 0,
                    declaration: schema.getSchema(),
                });
            }

            try {
                // store
                await repo.save(current);
            } catch (error) {
                logger.error('Unable to save schema to the database', error);
                errors.push({
                    message: __DEV__
                        ? error.message
                        : 'Unable to save schema to the database',
                    code: 'internal_db_error',
                    type: 'internal',
                });
            }
        }

        return errors;
    }
}

export default SchemaService;
