import { wrapError } from 'ew-internals';

export default (app, params = {}) => {
    app.get(
        '/schema',
        wrapError(async (req, res) => {

            res.status(200).send('Cache reset');
        }),
    );
};
