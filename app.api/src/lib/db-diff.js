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

        tables.forEach(table =>
            console.log(require('util').inspect(table.columns, { depth: 10 })),
        );

        // get all entites
        const list = await entityProvider.get();
        console.dir(list);

        // now we need to move entity fields to the same declaration and make diff
        // ...
    }
}
