import { wrapError } from 'ew-internals';
import { Schema } from 'project-minimum-core';
import SchemaService from '../service/schema';

// todo: move sendJSONResult() to ew-internals
const sendJSONResult = (res, result, code = null) => {
    let status = 200;
    if (code) {
        status = code;
    } else if (result.errors.find(error => error.type === 'internal')) {
        status = 500;
    } else if (result.errors.find(error => error.type === 'request')) {
        status = 400;
    }

    return res
        .header('Content-Type', 'application/json')
        .status(status)
        .send(JSON.stringify(result));
};

const useSchemaAPI = (app, params = {}) => {
    const { connectionManager } = params;

    /**
     * Get schema entity (draft or actual)
     */
    app.get(
        '/schema/:type/:entity',
        wrapError(async (req, res) => {
            const result = {
                errors: [],
                data: null,
            };

            const entity = _.get(req, 'params.entity');
            const type = _.get(req, 'params.type');
            if (type !== 'draft' && type !== 'actual') {
                result.errors.push({
                    message: 'Illegal schema type',
                    code: 'illegal_schema_type',
                    type: 'request',
                });
                return sendJSONResult(res, result);
            }

            const schema = await SchemaService.load(type, connectionManager);
            if (schema) {
                result.data = schema.getEntity(entity);
            }

            return sendJSONResult(res, result, !result.data ? 404 : null);
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
                data: null,
            };

            const type = _.get(req, 'params.type');
            if (type !== 'draft' && type !== 'actual') {
                result.errors.push({
                    message: 'Illegal schema type',
                    code: 'illegal_schema_type',
                    type: 'request',
                });
                return sendJSONResult(res, result);
            }

            result.data = await SchemaService.load(type, connectionManager);
            return sendJSONResult(res, result, !result.data ? 404 : null);
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
            const draftSchema = await SchemaService.load(
                'draft',
                connectionManager,
            );
            if (draftSchema) {
                result.errors = await SchemaService.put(
                    'actual',
                    draftSchema,
                    connectionManager,
                );
            }

            return sendJSONResult(res, result);
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

            const schema = _.get(req, 'body.schema.ts');
            result.errors = await SchemaService.put(
                'draft',
                new Schema({ schema }).getSchema(), // todo: this makes a vulnerability
                connectionManager,
            );

            return sendJSONResult(res, result);
        }),
    );
};

export default useSchemaAPI;
