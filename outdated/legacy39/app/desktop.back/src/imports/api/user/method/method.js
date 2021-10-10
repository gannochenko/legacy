import BaseMethod from '../../../lib/base/entity/method/method.js';
import Entity from '../entity/entity.server.js';

export default class Method extends BaseMethod
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
                    needAuthorized: true,
                },
            },
            getCount: {
                body: 'getCount',
                security: {
                    needAuthorized: true,
                    group: ['A'],
                },
                name: '#ENTITY#.count.get',
            },
            save: {
                body: 'save',
                security: {
                    authorized: true,
                    group: ['A'],
                },
            },
            remove: {
                body: 'remove',
                security: {
                    authorized: true,
                    group: ['A'],
                },
            },
        };
    }
}
