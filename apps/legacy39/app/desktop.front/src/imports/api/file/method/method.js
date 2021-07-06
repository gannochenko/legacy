import Method from '../../../lib/base/entity/method/method.js';
import Entity from '../entity/entity.server.js';
import Option from '../../../api/option/entity/entity.server.js'

export default class extends Method
{
    static getEntity()
    {
        return Entity;
    }

    static getBaseDeclaration(sp = null)
    {
        return {
            find: {
                body: 'find',
                security: {
                    needAuthorized: false,
                },
            },
            getCount: {
                body: 'getCount',
                security: {
                    needAuthorized: false,
                },
                name: '#ENTITY#.count.get',
            },
            save: {
                body: 'save',
                security: {
                    authorized: true,
                    group: ['A', 'E'],
                },
            },
            remove: {
                body: 'remove',
                security: {
                    authorized: true,
                    group: ['A', 'E'],
                },
            },
            getUploaderToken: {
                body: 'getUploaderToken',
                name: '#ENTITY#.uploader.token.get',
                security: {
                    authorized: true,
                    group: ['A', 'E'],
                },
            },
        };
    }

	getUploaderToken()
	{
		return Option.getValueOne('file.uploader.key') || '';
	}
}
