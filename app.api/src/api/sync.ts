import { Request, Response, Express } from 'express';
import { wrapError } from 'ew-internals';
import Migrator from '../lib/database/migrator';
import SchemaService from '../service/schema';
import ConnectionManager from '../lib/database/connection-manager';

interface SyncAPIParameters {
    connectionManager: ConnectionManager;
}

// todo: this is a temporary API
const useSyncAPI = (app: Express, { connectionManager }: SyncAPIParameters) => {
    app.get(
        '/sync',
        wrapError(async (req: Request, res: Response) => {
            const schema = await SchemaService.load(
                'actual',
                connectionManager,
            );
            await Migrator.apply({
                connection: await connectionManager.getSystem(),
                schema,
            });
            res.status(200).send(`<pre>1</pre>`);
        }),
    );
};

export default useSyncAPI;
