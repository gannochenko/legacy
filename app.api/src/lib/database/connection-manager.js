import { createConnection } from 'typeorm';

import { DB_MIGRATION_TABLE_NAME } from 'project-minimum-core';
import SchemaEntity from '../../model/schema';
import migrations from '../../migrations';
import { injectPassword } from '../util';

export default class ConnectionManager {
    constructor({ settings }) {
        this.settings = settings;
        this.connections = {};
    }

    /**
     * Creates a regular connection to get data over
     * @param entities
     * @param preConnect
     * @returns {Promise<*>}
     */
    async get({ entities, preConnect }) {
        if (!this.connections.entity) {
            this.connections.entity = this.make({
                settings: this.settings,
                entities,
                preConnect,
            });
        }
        return this.connections.entity;
    }

    /**
     * Close current regular connection
     * @returns {Promise<void>}
     */
    async close() {
        if (this.connections.entity) {
            await this.connections.entity.close();
            this.connections.entity = null;
        }
    }

    /**
     * Creates a system connection to get the schema over
     * @returns {Promise<*|CacheConfigurator.simple|buttonStyle.simple|{'&,&:focus,&:hover,&:visited', '&$primary', '&$info', '&$success', '&$warning', '&$rose', '&$danger', '&$twitter', '&$facebook', '&$google', '&$github'}>}
     */
    async getSystem() {
        if (!this.connections.simple) {
            this.connections.simple = this.make({
                name: 'system',
                settings: this.settings,
                entities: [SchemaEntity],
                migrationsTableName: DB_MIGRATION_TABLE_NAME,
                migrations,
            });
        }
        return this.connections.simple;
    }

    async invalidateConnections() {
        await this.close();
        this.connections = {};
    }

    async make(params = {}) {
        const { settings } = params;
        if (!settings) {
            throw new Error('No settings provided');
        }

        const url = await settings.get('db.url', null);
        const password = await settings.get('db.password', null);
        const sUrl = injectPassword(url, password);

        return createConnection({
            ...params,
            url: sUrl,
            type: 'postgres',
        });
    }
}
