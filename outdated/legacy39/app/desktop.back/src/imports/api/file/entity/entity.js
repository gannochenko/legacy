import Collection from '../config/collection.js';

/**
 * @abstract
 * @mixin
 */
const M = (superclass) =>  class File extends superclass
{
    static getCollectionInstance()
    {
        return Collection;
    }

	// ////////////////////
	// attribute URL

	/**
	 * Get URL by reference
	 * @return String|undefined
	 */
	getURL()
    {
		return this.getData().url;
	}

	/**
	 * Get URL by value
	 * @return String
	 */
	extractURL()
    {
		return this.getURL() || '';
	}

	/**
	 * Set URL by reference
	 * @param value
	 * @return void
	 */
	setURL(value)
    {
		this.getData().url = value;
	}

	/**
	 * Set URL by value
	 * @param value
	 * @return void
	 */
	putURL(value)
    {
		this.getData().url = value;
	}

	/**
	 * Check if we have an attribute URL
	 * @returns boolean
	 */
	hasURL()
    {
		return _.isStringNotEmpty(this.getURL());
	}

	/**
	 * Unset the attribute URL
	 * @returns void
	 */
	unSetURL()
    {
		const data = this.getData();
		delete data.url;
	}
};

export default M;
