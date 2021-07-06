import Migration from '../../../../lib/base/migration/index.js';
import Object from '../../../../api/registry.object/entity/entity.server.js';

export default new (class extends Migration {
	getVersion()
	{
		return 3;
	}

	getName()
	{
		return 'Document name';
	}

	up()
	{
		// update candidates
		this.transformItems(Object, {
				filter: {},
				select: {
					document: 1,
					documentName: 1,
				},
			}, (item, data) => {
				if (!_.isStringNotEmpty(item.documentName) && _.isStringNotEmpty(item.document))
				{
					data.documentName = item.document;
					data.document = [];
				}
			},
			false,
			true
		);
	}
})();
