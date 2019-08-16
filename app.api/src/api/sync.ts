import { Request, Response, Express } from 'express';
import { wrapError } from 'ew-internals';
import Migrator from '../lib/database/migrator';

// todo: this is a temporary API
const useSyncAPI = (app: Express, params: object = {}) => {
    app.get(
        '/sync',
        wrapError(async (req: Request, res: Response) => {
            await Migrator.migrate(params);
            res.status(200).send(`<pre>1</pre>`);
        }),
    );
};

export default useSyncAPI;
