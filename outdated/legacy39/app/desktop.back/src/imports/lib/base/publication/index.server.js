export default class Publication
{
    static getEntity()
    {
        throw new Error('Not implemented: getEntity()');
    }

    static getFilter()
    {
        return {};
    }

    static getFields()
    {
        return {_id: 1};
    }

    static make(sp)
    {
        const entity = this.getEntity();
        const name = `${entity.getUniqueCode()}.main`;
        const self = this;

        console.dir(`Publication: ${name}`);

        // DO NOT replace function() with arrow declaration, because we need to keep this.ready() working
        Meteor.publish(name, function () {
            return entity.getCollection().find(self.getFilter(), {
                fields: self.getFields(),
            });
        });
    }

    static denyAll()
    {
        this.getEntity().getCollection().deny({
            insert() { return true; },
            update() { return true; },
            remove() { return true; },
        });
    }

    static declare(sp = null)
    {
        this.denyAll();
        this.make(sp);
    }
}
