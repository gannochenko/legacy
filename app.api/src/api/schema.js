import { wrapError } from 'ew-internals';
import { Schema } from 'project-minimum-core';
import SchemaStore from '../lib/schema-store';

const sendResult = (res, result, code = null) => {
    let status = 200;
    if (code) {
        status = code;
    } else {
        if (result.errors.find(error => error.type === 'internal')) {
            status = 500;
        } else if (result.errors.find(error => error.type === 'request')) {
            status = 400;
        }
    }
    return res
        .header('Content-Type', 'application/json')
        .status(status)
        .send(JSON.stringify(result));
};

export default (app, params = {}) => {
    const { connectionManager } = params;

    /**
     * Get schema entity (draft or actual)
     */
    app.get(
        '/schema/:type/:entity',
        wrapError(async (req, res) => {
            const result = {
                errors: [],
                entity: null,
            };

            const entity = _.get(req, 'params.entity');
            const type = _.get(req, 'params.type');
            if (type !== 'draft' && type !== 'actual') {
                result.errors.push({
                    message: 'Illegal schema type',
                    code: 'illegal_schema_type',
                    type: 'request',
                });
                return sendResult(res, result);
            }

            const schema = await SchemaStore.load(type, connectionManager);
            if (schema) {
                result.entity = schema.getEntity(entity);
            }

            return sendResult(res, result, !result.entity ? 404 : null);
        }),
    );

    /**
     * Get the entire schema (draft or actual)
     */
    app.get(
        '/schema/:type',
        wrapError(async (req, res) => {
            const result = {
                errors: [],
                structure: null,
            };

            const type = _.get(req, 'params.type');
            if (type !== 'draft' && type !== 'actual') {
                result.errors.push({
                    message: 'Illegal schema type',
                    code: 'illegal_schema_type',
                    type: 'request',
                });
                return sendResult(res, result);
            }

            result.structure = await SchemaStore.load(type, connectionManager);
            return sendResult(res, result, !result.structure ? 404 : null);
        }),
    );

    /**
     * Commit the draft schema to the actual schema
     */
    app.put(
        '/schema',
        wrapError(async (req, res) => {
            const result = {
                errors: [],
            };

            // replace an actual schema with a draft
            const draftSchema = await SchemaStore.load(
                'draft',
                connectionManager,
            );
            if (draftSchema) {
                result.errors = await SchemaStore.put(
                    'actual',
                    draftSchema,
                    connectionManager,
                );
            }

            return sendResult(res, result);
        }),
    );

    /**
     * Save draft schema
     */
    app.patch(
        '/schema',
        wrapError(async (req, res) => {
            // save new schema as draft, check first
            const result = {
                errors: [],
            };

            const structure = _.get(req, 'body.structure');
            const schema = new Schema(structure);
            result.errors = await SchemaStore.put(
                'draft',
                schema,
                connectionManager,
            );

            return sendResult(res, result);
        }),
    );
};
