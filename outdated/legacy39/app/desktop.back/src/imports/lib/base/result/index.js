export default class Result
{
    constructor(data = null, errors = null)
    {
        this.setData(data);
    }

    addError(e)
    {
        this._errors = this._errors || [];
        this._errors.push(e);
    }

    setErrors(errors)
    {
        this._errors = errors;
    }

    getErrors()
    {
        return this._errors || [];
    }

    getErrorFirst()
    {
        if (!this.isSuccess())
        {
            return this.getErrors()[0];
        }

        return null;
    }

    isSuccess()
    {
        return !_.isArrayNotEmpty(this._errors);
    }

    setData(data)
    {
        this._data = data;
    }

    getData()
    {
        return this._data || null;
    }

    g()
    {
        return this.getData();
    }

    isNotEmpty()
    {
        return this.getData() !== null && this.getData() !== undefined;
    }

    // todo: rename to deHydrate()
    makePlain()
    {
        return {
            data: this.getData(),
            errors: this.makeErrorsPlain(),
        }
    }

    makeErrorsPlain()
    {
        return this.getErrors().map(e => { return {message: e.message}; });
    }

    static hydrate(plain)
    {
        plain = _.isObjectNotEmpty(plain) ? plain : {};

        const result = new this();
        result.setData(plain.data);
        result.setErrors(plain.errors);

        return result;
    }
}
