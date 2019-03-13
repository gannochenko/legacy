import { wrapError } from 'ew-internals';

export default (app, params = {}) => {
    const { cache } = params;
    app.get(
        '/',
        wrapError(async (req, res) => {
            await cache.invalidate('apollo');
            res.status(200).send('Cache reset');
        }),
    );
};
