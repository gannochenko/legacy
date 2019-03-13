import { wrapError } from 'ew-internals';
import DBDiff from '../lib/db-diff';

export default (app, params = {}) => {
    const { cache, entityProvider, connection } = params;
    app.get(
        '/sync',
        wrapError(async (req, res) => {
            await DBDiff.make(params);
            res.status(200).send(`<pre>1</pre>`);
        }),
    );
};
