import { wrapError } from '../lib/util';

export default (app, params = {}) => {
    const { cache } = params;
    app.get(
        '/conv',
        wrapError(async (req, res) => {
            const entityA = {};

            res.status(200).send('Cache reset');
        }),
    );
};
