import Method from '../../../lib/base/entity/method/method.js';
import Entity from '../entity/entity.server.js';

import SecurityProvider from '../../../lib/util/security/provider.js';

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

    static getExtendedDeclaration(sp = null)
    {
        return {
            getCodeMap: {
                body: 'getCodeMap',
                security: SecurityProvider.getOpenGatePolicy(),
                name: '#ENTITY#.codeMap.get',
            },
        };
    }

    getCodeMap()
    {
        const result = {};
        // FIND
        this.getEntity().find({select: ['code']}, {returnArray: true}).forEach((item) => {
            result[item._id] = item.code;
        });

        return result;
    }
}
