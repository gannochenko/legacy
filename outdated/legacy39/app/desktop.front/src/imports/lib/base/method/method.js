import {Meteor} from 'meteor/meteor';
import Side from '../../util/side.js';
import Security from '../../util/security/security.server.js';
import SecurityProvider from '../../util/security/provider.js';

Side.ensureOnServer();

/**
 * @abstract
 */
export default class Method
{
    _invocationCtx = null;

    static declare(declaration)
    {
        if (_.isObjectNotEmpty(declaration))
        {
            const methods = {};

            // prepare method bodies
            _.each(declaration, (desc, name) => {
                name = name.toString().trim();

                const bodyName = desc.body.toString().trim();
                if (!(bodyName in this.prototype))
                {
                    throw new Error(`Body function ${bodyName}(){...} not implemented for method "${name}"`);
                }

                // assign default security policy if was not specified in the declaraion
                if (!('security' in desc))
                {
                    desc.security = this.getDefaultMethodSecurityPolicy();
                }

                // turn logging by default
                if (!('log' in desc))
                {
                    desc.log = true;
                }

                console.dir(`Method: ${name}`);

                methods[name] = this.makeBody(desc, name, bodyName);
            });

            // passing methods to Meteor
            Meteor.methods(methods);
        }
    }

    static makeBody(desc, name, bodyName)
    {
        const _method = this;

        return function Implementation()
        {
            // eslint-disable-next-line prefer-rest-params
            const _args = arguments;

            const code = Security.testUserCurrent(desc.security);
            if (code !== Security.OK)
            {
                throw new Meteor.Error(code, `Access denied: executing ${name}`);
            }

            if (desc.log)
            {
                // console.dir('Called: '+name);
                // console.dir(desc.security);

                // todo: implement this
                // _method.logger.info(`Method ${name}`, {
                //     args: _args,
                //     userId: _method.getUserId(),
                // });
            }

            const context = new _method();
            context.setInvocationContext(this);

            let result;

            try
            {
                result = context[bodyName](..._args);
            }
            catch (e)
            {
                if (!Meteor.isDevelopment)
                {
                    // on production all errors go to log, and only then - to the client

                    // todo: implement this
                    // Logger.error('Exception', {
                    //     userId: _method.getUserId(),
                    //     args: _.toString(_args),
                    //     message: e.message,
                    //     trace: e.stack,
                    // });
                }

                throw e;
            }

            return result;
        };
    }

    static getDefaultMethodSecurityPolicy()
    {
        return SecurityProvider.getStandardPolicy();
    }

    setInvocationContext(ctx)
    {
        this._invocationCtx = ctx;
    }

    getInvocationContext()
    {
        return this._invocationCtx;
    }

    spawnInvocation(constructor)
    {
        const instance = new constructor();
        instance.setInvocationContext(this.getInvocationContext());

        return instance;
    }

    static getUserId()
    {
        return Meteor.user() ? Meteor.user()._id : '';
    }
}
