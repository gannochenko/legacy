import { wrapError } from 'ew-internals';
import { getRepository } from 'typeorm';
import SchemaEntity from '../entity/schema';
import Schema from '../lib/schema';

export default (app, params = {}) => {

    const { connectionManager } = params;

    app.get(
        '/schema/:entity',
        wrapError(async (req, res) => {
            const schema = await Schema.load();
            const entity = _.get(req, 'params.entity');
            res.header('Content-Type', 'application/json').status(200).send(JSON.stringify({
                entity: schema.getEntity(entity),
            }));
        }),
    );
    app.get(
        '/schema',
        wrapError(async (req, res) => {
            const schema = await Schema.load();
            res.header('Content-Type', 'application/json').status(200).send(JSON.stringify({
                structure: schema,
            }));
        }),
    );
    app.post(
        '/schema/commit',
        wrapError(async (req, res) => {
            // replace an actual schema with a draft, check first
            res.status(200).send('post schema');
        }),
    );
    app.post(
        '/schema',
        wrapError(async (req, res) => {
            // save new schema as draft, check first
            const schema = _.get(req.body, 'schema');

            const connection = await connectionManager.getSystem();
            const repo = connection.getRepository(SchemaEntity);

            console.dir(req.body);

            res.status(200).send('post schema');
        }),
    );
};
