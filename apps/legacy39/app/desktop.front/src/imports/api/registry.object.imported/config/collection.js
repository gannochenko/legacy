import Collection from '../../../lib/base/collection/collection.js';

export default new class extends Collection
{
    constructor()
    {
        super('registry.object.imported');
    }

    getIndexes()
    {
        return [
            {
                fields: {
                    uid: "hashed",
                },
                options: {
                    name: 'name-key',
                    unique: true,
                },
            }
        ];
    }
}
