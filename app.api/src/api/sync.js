import { wrapError } from 'ew-internals';
import Migrator from '../lib/migrator';

export default (app, params = {}) => {
    app.get(
        '/sync',
        wrapError(async (req, res) => {
            await Migrator.migrate(params);
            res.status(200).send(`<pre>1</pre>`);
        }),
    );
};
