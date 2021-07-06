import FileMethods from './file/method.js';
import UserMethods from './user/method.js';
import UserGroupMethods from './user.group/method.js';
import OptionMethods from './option/method.js';
import RegistryObjectMethods from './registry.object/method.js';

import {provider} from './security-provider.js';

FileMethods.declare(provider);
UserMethods.declare(provider);
UserGroupMethods.declare(provider);
OptionMethods.declare(provider);
RegistryObjectMethods.declare(provider);
