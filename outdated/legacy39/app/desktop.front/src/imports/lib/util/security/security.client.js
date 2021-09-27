import User from '../../../api/user/entity/entity.client.js';
import UserGroup from '../../../api/user.group/entity/entity.client.js';
import SecurityBoth from './security.both.js';
import Side from '../side.js';

Side.ensureOnClient();

import ConsoleOutput from '../console-output';

export default class Security extends SecurityBoth
{
    static getUserEntity()
    {
        return User;
    }

    static getUserGroupEntity()
    {
        return UserGroup;
    }

    static testUserCurrent(rules)
    {
        ConsoleOutput.dir('Checking page access...');
        const res = super.testUserCurrent(rules);
        ConsoleOutput.dir(`...${res}`);

        return res;
    }
}
