import SchemaEntity from '../entity/schema';
import { Schema } from 'project-minimum-core';

class SchemaStore {
    static async load(type, connectionManager) {
        const connection = await connectionManager.getSystem();

        const structure = await connection.getRepository(SchemaEntity).findOne({
            draft: type === 'draft',
        });

        if (!structure) {
            return null;
        }

        return new Schema(structure.structure);
    }

    static async put(type, schema, connectionManager) {
        const errors = schema.checkHealth();
        if (!_.iane(errors)) {
            const connection = await connectionManager.getSystem();
            const repo = connection.getRepository(SchemaEntity);

            // get current
            let current = await connection.getRepository(SchemaEntity).findOne({
                draft: false,
            });
            if (current) {
                // have current => update
                let version = parseInt(current.version, 10);
                if (Number.isNaN(version)) {
                    version = 0;
                }
                repo.merge(current, {
                    version: version + 1,
                    structure: schema.get(),
                });
            } else {
                // else => create
                current = repo.create({
                    draft: false,
                    version: 0,
                    structure: schema.get(),
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

export default SchemaStore;
