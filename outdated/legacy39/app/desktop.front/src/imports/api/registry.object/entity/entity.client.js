import BaseEntity from '../../../lib/base/entity/entity.client.js';
import Entity from './entity.js';
import mix from '../../../lib/mixin.js';
import map from '../map/map.client.js';
import File from '../../file/entity/entity.client.js'

import EntityCollection from '../../../lib/base/entity-collection/index-client.js';

export default class RegistryObject extends mix(BaseEntity).with(Entity)
{
    static getMapInstance()
    {
        return map;
    }

    static getTitle()
    {
        return 'Registry object';
    }

	getFileCollection()
	{
		if (!this._fileCollection)
		{
			this._fileCollection = new EntityCollection(File);
		}

		return this._fileCollection;
	}

	setFileCollection(collection)
	{
		this._fileCollection = collection;
	}

	getFileReferences()
	{
		let ids = [];

		if (this.hasPhotoId())
		{
			ids.push(this.getPhotoId());
		}
		if (this.hasDocument()) {
			ids = _.union(ids, this.extractDocument().map((item) => {
				return item.fileId;
			}));
		}

		return ids;
	}

	async populate()
	{
		return Promise.all([
			this.getFileCollection().pumpUp(this.getFileReferences()),
		]);
	}

	// ////////////////////
	// attribute Photo

	/**
	 * Get photo by reference
	 * @return File|undefined
	 */
	getPhoto()
	{
		return this.getFileCollection().getItem(this.getPhotoId());
	}

	/**
	 * Check if we have an attribute photo
	 * @returns boolean
	 */
	hasPhoto() {
		return this.hasPhotoId();
	}
}
