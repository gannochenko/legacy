import { wrapError } from 'ew-internals';
import DDLGenerator from '../lib/ddl-generator';

export default (app, params = {}) => {
    app.get(
        '/sync',
        wrapError(async (req, res) => {
            await DDLGenerator.make(params);
            res.status(200).send(`<pre>1</pre>`);
        }),
    );
};
