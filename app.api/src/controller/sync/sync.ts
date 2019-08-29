// @ts-ignore
import { Endpoint, Get, InputContext } from '../../lib/msc';
import SchemaService from '../../service/schema';
import Migrator from '../../lib/database/migrator';

@Endpoint('/sync')
export class SyncController {
    @Get()
    public async getEntity(
        args: {},
        { runtime: { connectionManager } }: InputContext,
    ): Promise<string> {
        const schema = await SchemaService.load('actual', connectionManager);
        await Migrator.apply({
            connection: await connectionManager.getSystem(),
            schema,
        });

        return 'Schema updated';
    }
}
