import { wrapError } from 'ew-internals';
import { getRepository } from 'typeorm';
import SchemaEntity from '../entity/schema';

export default (app, params = {}) => {

    const { connectionManager } = params;

    app.get(
        '/schema',
        wrapError(async (req, res) => {

            res.status(200).send('get schema');
        }),
    );
    app.get(
        '/schema/:entity',
        wrapError(async (req, res) => {

            res.status(200).send('get schema');
        }),
    );
    app.post(
        '/schema/commit',
        wrapError(async (req, res) => {
            res.status(200).send('post schema');
        }),
    );
    app.post(
        '/schema',
        wrapError(async (req, res) => {

            const schema = _.get(req.body, 'schema');


            const connection = await connectionManager.getSystem();
            const repo = connection.getRepository(SchemaEntity);

            console.dir(req.body);

            res.status(200).send('post schema');
        }),
    );
};
