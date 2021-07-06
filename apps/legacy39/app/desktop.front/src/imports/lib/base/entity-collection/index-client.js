export default class EntityCollection
{
	constructor(entity)
	{
		this._entity = entity;
	}

	getEntity()
	{
		return this._entity;
	}

	getFilter()
	{
		return this._filter || null;
	}

	setFilter(filter)
	{
		this._filter = _.deepClone(filter);
		this.purge();
	}

	getItems()
	{
		this._items = this._items || [];
		return this._items;
	}

	getIds() {
		if (!this._ids)
		{
			this._ids = this.getItems().map(item => item.getId());
		}

		return this._ids;
	}

	getIdMap() {
		if (!this._idMap)
		{
			this._idMap = this.getItems().reduce((result, item) => {
				result[item.getId()] = item;
				return result;
			}, {});
		}

		return this._idMap;
	}

	invalidateCache()
	{
		this._ids = null;
		this._idMap = null;
	}

	// setPumped(result) {
	// 	this._pumped = !!result;
	// 	this._pumping = false;
	// 	if (_.isArrayNotEmpty(this._awaiters)) {
	// 		this._awaiters.forEach((awaiter) => {
	// 			if (result) {
	// 				awaiter.resolve();
	// 			} else {
	// 				awaiter.reject();
	// 			}
	// 		});
	// 	}
	// }
	//
	// async pumpUp() {
	// 	if (this._pumped) {
	// 		return true;
	// 	}
	//
	// 	if (this._pumping) {
	// 		this._awaiters = this._awaiters || [];
	// 		return new Promise((resolve, reject) => {
	// 			this._awaiters.push({resolve, reject});
	// 		});
	// 	}
	//
	// 	this._pumping = true;
	// 	return new Promise((resolve, reject) => {
	// 		this.makeQuery().fetch((err, items) => {
	// 			if (err) {
	// 				reject(err);
	// 			} else {
	// 				this.setItems(items.map(this.prepareItem));
	// 				this.setPumped(true);
	// 				resolve(true);
	// 			}
	// 		});
	// 	});
	// }

	makeFindParameters(ids)
	{
		return {
			select: '#',
			filter: {
				_id: {$in: ids},
			},
		};
	}

	push(item)
	{
		this.getItems().push(item);
		this.invalidateCache();
	}

	getItem(id)
	{
		if (!id)
		{
			return null;
		}

		return this.getIdMap()[id] || null;
	}

	async pumpUp(keys)
	{
		if (!_.isArrayNotEmpty(keys))
		{
			return;
		}

		const missing = _.difference(keys, this.getIds());
		if (_.isArrayNotEmpty(missing))
		{
			const items = await this.getEntity().find(this.makeFindParameters(missing));
			if (_.isArrayNotEmpty(items))
			{
				items.forEach((item) => {
					this.getItems().push(item);
				});
				this.invalidateCache();
			}
		}
	}

	purge() {
		this._items = [];
		this.invalidateCache();
	}
}
