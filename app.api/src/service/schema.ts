import { Result } from '@bucket-of-bolts/express-mvc';
import _ from '@bucket-of-bolts/microdash';
import { logError } from '@bucket-of-bolts/util';
import { Schema } from '@project-minimum/core';
import { ResultError } from '@bucket-of-bolts/express-mvc/type';
import SchemaEntity from '../model/schema';
import ConnectionManager from '../lib/database/connection-manager';

export type SchemaType = 'draft' | 'actual';

class SchemaService {
    public static async load(
        type: SchemaType,
        connectionManager: ConnectionManager,
    ): Promise<Schema> {
        const connection = await connectionManager.getSystem();

        const declaration = await connection
            .getRepository(SchemaEntity)
            .findOne({
                draft: type === 'draft',
            });

        return new Schema(declaration || {});
    }

    public static async put(
        type: SchemaType,
        schema: Schema,
        connectionManager: ConnectionManager,
    ): Promise<Result> {
        const result = new Result();

        const errors: ResultError[] = [];
        const schemaErrors = await schema.getHealth();
        if (!_.isArrayNotEmpty(schemaErrors)) {
            const connection = await connectionManager.getSystem();
            const repository = connection.getRepository(SchemaEntity);

            // get current
            let current = await connection.getRepository(SchemaEntity).findOne({
                draft: false,
            });
            if (current) {
                const currentSchema = new Schema(current);
                // have current => update
                repository.merge(current, {
                    version: currentSchema.getVersion() + 1,
                    schema: schema.getSchema().map(item => item.toJSON()),
                });
            } else {
                // else => create
                current = repository.create({
                    draft: false,
                    version: 0,
                    schema: schema.getSchema(),
                });
            }

            try {
                // store
                await repository.save(current as SchemaEntity);
            } catch (error) {
                logError('Unable to save schema to the database', error);
                schemaErrors.push({
                    message: __DEV__
                        ? error.message
                        : 'Unable to save schema to the database',
                    code: 'internal_db_error',
                });
            }
        }

        for (const error of schemaErrors) {
            errors.push({
                message: error.message || '',
                code: error.code,
            });
        }

        result.setErrors(errors);

        return result;
    }
}

export default SchemaService;
