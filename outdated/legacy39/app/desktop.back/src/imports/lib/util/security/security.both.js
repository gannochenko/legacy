export default class Security
{
    static OK = 200;
    static NOT_AUTHORIZED = 401;
    static FORBIDDEN = 403;

    static getUserGroupEntity()
    {
        throw new Error('Not implemented: static getUserGroupEntity()');
    }

    /**
     * Returns the HTTP code: 401, 403 or 200, depending on if the current user passes
     * the security restrictions or not.
     * @param user
     * @param rules
     * @returns {number}
     */

    static testUser(user, rules)
    {
        // console.dir('Test '+user.getId());
        // console.dir(user);
        // console.dir(rules);

        if (!_.isObject(rules) && !_.isFunction(rules))
        {
            // no restrictions, free entrance
            return this.OK;
        }

        // security declaration object can be a custom callback
        // todo: but we need more arguments to pass, to make it useful =/
        if (_.isFunction(rules))
        {
            const fResult = rules(user);
            if (_.isBoolean(fResult))
            {
                return fResult ? this.OK : this.FORBIDDEN;
            }

            return fResult;
        }

        if (rules.denyAll && !user)
        {
            return this.FORBIDDEN;
        }

        if (rules.needAuthorized && !user.getId())
        {
            return this.NOT_AUTHORIZED;
        }

        let passed;

        if (_.isArrayNotEmpty(rules.group))
        {
            const groups = user.getGroupIds().map((id) => {
                return this.getUserGroupEntity().getCodeById(id);
            });

            passed = _.intersection(rules.group, groups).length;
        }
        else
        {
            passed = true;
        }

        // todo: more rules coming

        return passed ? this.OK : this.FORBIDDEN;
    }

    static testUserCurrent(rules)
    {
        return this.testUser(this.getUserEntity().get(), rules);
    }
}
