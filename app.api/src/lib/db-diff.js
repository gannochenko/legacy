export default class DBDiff {
    /**
     * So this function calculates a set of commands that are to execute to set the database in sync with data structure
     * @param params
     * @returns {Promise<void>}
     */
    static async make(params = {}) {
        const { entityProvider, connection } = params;

        const qr = (await connection.getConnection()).createQueryRunner(
            'master',
        );
        // get all entity tables
        const prefix = ''; // todo: should be eg_entity_
        const eTableNames = (await qr.query(
            `select * from information_schema.tables where table_schema='public' and table_name like '${prefix}%'`,
        )).map(t => t.table_name);

        let tables = [];
        if (_.iane(eTableNames)) {
            tables = await qr.getTables(eTableNames);
        }

        console.dir('Tables');
        tables.forEach(table =>
            console.log(require('util').inspect(table.columns, { depth: 10 })),
        );

        // get all entites
        const entities = await entityProvider.get();
        console.dir('Entities');
        console.log(require('util').inspect(entities, { depth: 10 }));

        // unify the format between a tables and entities:

        // calculate diff:

        // tables to be created
        // // for each reference field create a connection table

        // tables to be dropped
        // // for each reference field - don't forget to drop the corresponding connection table

        // tables to be updated (the most of fun is here)
        // for each table to update:

        // columns to be added
        // // for each reference field create a connection table

        // columns to be removed
        // // for each reference field - don't forget to drop the corresponding connection table

        // columns to be updated in terms of type
        // // if the field was a reference field, but became something else - drop the connection table
        // // if the field was something else, but became a reference field - add a connection table
        // // if the field was a reference field, and stays the same, but gets connected to the other entity, then drop one connection table and create another (or should not we?)

        // Thoughts:
        // the field is not allowed to be renamed, because the field name is it's "unique" id. Besides, there is no typical case for renaming fields, only damn perfectionists do so.
        // the name of the connection table shall be eg_ref_<entity-name>_<field-name>
        // in postgres the maximum length of an identifier is 63, so we can allow <entity-name> and <field-name> to be no more than 27 characters long
        // this is not good. we can replace these identifiers with hashes or meaningless aliases
        // for the first version I guess I am not going to allow field type change
    }
}
