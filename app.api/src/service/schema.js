import { Schema } from 'project-minimum-core';
import SchemaEntity from '../entity/schema';

class SchemaService {
    static async load(type, connectionManager) {
        const connection = await connectionManager.getSystem();

        const schema = await connection.getRepository(SchemaEntity).findOne({
            draft: type === 'draft',
        });

        if (!schema) {
            return null;
        }

        return new Schema(schema);
    }

    static async put(type, schema, connectionManager) {
        const errors = await schema.checkHealth();
        if (!_.iane(errors)) {
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
