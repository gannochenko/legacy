import { wrapError } from 'ew-internals';

export default (app, params = {}) => {
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
        '/schema',
        wrapError(async (req, res) => {

            res.status(200).send('post schema');
        }),
    );
};
