import OptionPublication from './option/publication.js';
import UserPublication from './user/publication.js';

import {provider} from './security-provider.js';

OptionPublication.declare(provider);
UserPublication.declare(provider);