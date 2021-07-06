import FileMethods from './file/method.js';
import RegistryObjectMethods from '../api/registry.object/method/method.js';
import RegistryObjectImportedMethods from '../api/registry.object.imported/method/method.js';
import DraftMethods from '../api/draft/method/method.js';
import UserGroupMethods from '../api/user.group/method/method.js';

import {provider} from './security-provider.js';

FileMethods.declare(provider);
RegistryObjectMethods.declare(provider);
DraftMethods.declare(provider);
UserGroupMethods.declare(provider);
RegistryObjectImportedMethods.declare(provider);
