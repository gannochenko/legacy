import { wrapError } from '../lib/util';
import GQLGenerator from '../lib/gql-generator';

export default (app, params = {}) => {
    const { cache, entityProvider } = params;
    app.get(
        '/conv',
        wrapError(async (req, res) => {
            const list = await entityProvider.get();

            // convert schema to graphql
            const gql = list.map(entity => GQLGenerator.make(entity)).join('');

            res.status(200).send(`<pre>${gql}</pre>`);
        }),
    );
};
