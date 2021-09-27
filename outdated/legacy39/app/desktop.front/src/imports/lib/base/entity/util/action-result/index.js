import Result from '../../../result';

export default class ActionResult extends Result
{
    cancel()
    {
        this._cancelled = true;
    }

    wasCancelled()
    {
        return !!this._cancelled;
    }

    setId(id)
    {
        this._id = id;
    }

    getId()
    {
        return this._id || '';
    }

    makePlain()
    {
        const plain = super.makePlain();
        plain.id = this.getId();
        plain.cancelled = this.wasCancelled();

        return plain;
    }

    static hydrate(plain)
    {
        plain = _.isObjectNotEmpty(plain) ? plain : {};

        const result = super.hydrate(plain);
        if (plain.cancelled)
        {
            result.cancel();
        }
        result.setId(plain.id);

        return result;
    }
}
