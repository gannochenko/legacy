import BaseMethod from '../../method/method.js';
import SecurityProvider from '../../../util/security/provider.js';

export default class Method extends BaseMethod
{
    static getEntity()
    {
        throw new Error('Not implemented: static getEntity()');
    }

    getEntity()
    {
        return this.constructor.getEntity();
    }

	/**
     * Todo: rename to getDeclaration(), remove getExtendedDeclaration() and (probably) put this stub into each entity method file
	 * @param sp
	 * @returns {{find: {body: string, security: null}, getCount: {body: string, security: null, name: string}, save: {body: string, security: {needAuthorized: boolean}}, remove: {body: string, security: {needAuthorized: boolean}}}}
	 */
	static getBaseDeclaration(sp = null)
    {
        const e = this.getEntity();

        // todo: provide "name" key to specify the method name
        // todo: move the security ouf of here, because the security declaration should go at the place where methods are exposed, not here
        // todo: support async method declaration
	    // todo: also, remove "open gate" rule by default, the default security policy should be (authorized AND "ADMIN")
        // todo: get***Policy() maybe rename to getPolicyPreset()
        // todo: maybe make applyPloicy() method, to make it more handy to worth with expositions
        return {
            find: {
                body: 'find',
                security: sp ? sp.getMethodPolicy(e, 'find') : SecurityProvider.getOpenGatePolicy(),
            },
            getCount: {
                body: 'getCount',
                security: sp ? sp.getMethodPolicy(e, 'getCount') : SecurityProvider.getOpenGatePolicy(),
                name: '#ENTITY#.count.get',
            },
            save: {
                body: 'save',
                security: sp ? sp.getMethodPolicy(e, 'save') : SecurityProvider.getStandardPolicy(),
            },
            remove: {
                body: 'remove',
                security: sp ? sp.getMethodPolicy(e, 'remove') : SecurityProvider.getStandardPolicy(),
            },
        };
    }

    /**
     * Declare additional, entity-specific methods here
     * @returns {{}}
     */
    static getExtendedDeclaration(sp = null)
    {
        return {};
    }

    // todo: rename to "expose" or "exposeAs" ("exposeWith" ?) and allow also a plain object or an array as the first argument
    // todo: in the array we declare a set of polices to accept
    // todo: make the unified mechanism with pages
    static declare(securityProvider = null)
    {
        const declaration = Object.assign(
            {},
            this.getBaseDeclaration(securityProvider),
            this.getExtendedDeclaration(securityProvider)
        );

        if (_.isObjectNotEmpty(declaration))
        {
            const named = {};
            _.forEach(declaration, (method, code) => {
                named[this.makeName(code, method)] = method;
            });
            
            super.declare(named);
        }
    }

    static makeName(code, parameters)
    {
        const cId = this.getEntity().getUniqueCode();

        if (_.isStringNotEmpty(parameters.name))
        {
            return parameters.name.replace(/#ENTITY#/g, cId).trim();
        }

        return `${cId}.${code}`;
    }

    find(parameters)
    {
        return this.getEntity().find(parameters, {returnArray: true, verbose: true}).makePlain();
    }

    getCount(filter)
    {
        return this.getEntity().getCount(filter, {verbose: true}).makePlain();
    }

    save(id, data)
    {
        return this.getEntity().save(id, data).makePlain();
    }

    remove(filter)
    {
        return this.getEntity().remove(filter).makePlain();
    }
}
