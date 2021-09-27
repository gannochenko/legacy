import BaseSecurityProvider from '../lib/util/security/provider.js';

export default class SecurityProvider extends BaseSecurityProvider
{
    getMethodPolicy(entity, method)
    {
        if (entity.getUniqueCode() === 'registryobject')
        {
            return this.constructor.getStandardPolicy();
        }

        // allow only find() and getCount(), reject all the rest
        if (method !== 'find' && method !== 'getCount')
        {
            return this.constructor.getConcreteWallPolicy();
        }

        return this.constructor.getOpenGatePolicy();
    }
}

export const provider = new SecurityProvider();
