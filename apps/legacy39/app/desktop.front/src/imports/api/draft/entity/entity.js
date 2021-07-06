import Collection from '../config/collection.js';

// import moment from 'moment';

/**
 * @abstract
 * @mixin
 */
const M = (superclass) =>  class Draft extends superclass
{
    static getCollectionInstance()
    {
        return Collection;
    }

	// ////////////////////
	// attribute UserId

	/**
	 * Get userId by reference
	 * @return String|undefined
	 */
	getUserId()
    {
		return this.getData().userId;
	}

	/**
	 * Get userId by value
	 * @return String
	 */
	extractUserId()
    {
		return this.getUserId() || '';
	}

	/**
	 * Set userId by reference
	 * @param value
	 * @return void
	 */
	setUserId(value)
    {
		this.getData().userId = value;
	}

	/**
	 * Set userId by value
	 * @param value
	 * @return void
	 */
	putUserId(value)
    {
		this.getData().userId = value;
	}

	/**
	 * Check if we have an attribute userId
	 * @returns boolean
	 */
	hasUserId()
    {
		return _.isStringNotEmpty(this.getUserId());
	}

	// ////////////////////
	// attribute ObjectId

	/**
	 * Get objectId by reference
	 * @return String|undefined
	 */
	getObjectId()
    {
		return this.getData().objectId;
	}

	/**
	 * Get objectId by value
	 * @return String
	 */
	extractObjectId()
    {
		return this.getObjectId() || '';
	}

	/**
	 * Set objectId by reference
	 * @param value
	 * @return void
	 */
	setObjectId(value)
    {
		this.getData().objectId = value;
	}

	/**
	 * Set objectId by value
	 * @param value
	 * @return void
	 */
	putObjectId(value)
    {
		this.getData().objectId = value;
	}

	/**
	 * Check if we have an attribute objectId
	 * @returns boolean
	 */
	hasObjectId()
    {
		return _.isStringNotEmpty(this.getObjectId());
	}

	// ////////////////////
	// attribute Payload

	/**
	 * Get payload by reference
	 * @return Object|undefined
	 */
	getPayload()
	{
		return this.getData().payload;
	}

	/**
	 * Get payload by value
	 * @return Object
	 */
	extractPayload()
	{
		return this.getPayload() || '';
	}

	/**
	 * Set payload by reference
	 * @param value
	 * @return void
	 */
	setPayload(value)
	{
		this.getData().payload = value;
	}

	/**
	 * Set payload by value
	 * @param value
	 * @return void
	 */
	putPayload(value)
	{
		this.getData().payload = _.deepClone(value);
	}

	/**
	 * Check if we have an attribute payload
	 * @returns boolean
	 */
	hasPayload()
	{
		const pl = this.getPayload();
		return pl !== undefined && pl !== null;
	}

	// ////////////////////

    _normalize(data)
    {
        return data;
    }
};

export default M;
