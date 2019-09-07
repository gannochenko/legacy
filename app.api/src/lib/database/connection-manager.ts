import { createConnection, Connection, EntitySchema } from 'typeorm';

// @ts-ignore
import { DB_MIGRATION_TABLE_NAME } from 'project-minimum-core';
import { injectPassword, Settings } from '@bucket-of-bolts/util';
import SchemaEntity from '../../model/schema';
import migrations from '../../migrations';

interface ConnectionManagerParameters {
    settings: Nullable<Settings>;
}

interface ConnectionOptions {
    settings?: Nullable<Settings>;
    entities?: EntitySchema[];
    migrationsTableName?: string;
    name?: string;
    migrations?: Function[];
    [key: string]: any;
}

export default class ConnectionManager {
    private readonly settings: Nullable<Settings> = null;
    private connections: StringMap<Nullable<Connection>> = {};

    public constructor(
        { settings }: ConnectionManagerParameters = { settings: null },
    ) {
        this.settings = settings;
    }

    public async get({ entities }: ConnectionOptions = {}) {
        if (!this.connections.main) {
            this.connections.main = await this.make({
                settings: this.settings,
                entities,
            });
        }
        return this.connections.main;
    }

    /**
     * Close current regular connection
     * @returns {Promise<void>}
     */
    public async close() {
        if (this.connections.main) {
            await this.connections.main.close();
            this.connections.main = null;
        }
    }

    /**
     * Creates a system connection to get the schema over
     */
    public async getSystem() {
        if (!this.connections.system) {
            this.connections.system = await this.make({
                name: 'system',
                settings: this.settings,
                // converting to EntitySchema, because typescript does not work with
                // decorators well enough so far
                entities: [(SchemaEntity as unknown) as EntitySchema],
                migrationsTableName: DB_MIGRATION_TABLE_NAME as string,
                migrations,
            });
        }
        return this.connections.system;
    }

    public async invalidateConnections() {
        await this.close();
        this.connections = {};
    }

    public async make(parameters: ConnectionOptions = {}) {
        const { settings } = parameters;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = (await settings.get('db.url', null)) as Nullable<string>;
        const password = (await settings.get('db.password', null)) as Nullable<
            string
        >;
        if (!url) {
            throw new Error('db.url not defined');
        }

        const sUrl = injectPassword(url, password);

        return createConnection({
            ...parameters,
            url: sUrl,
            type: 'postgres',
        });
    }
}
