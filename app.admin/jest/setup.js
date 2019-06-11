import 'jest-dom/extend-expect';

import _ from '../common/lib/lodash';

global._ = _;
global.__TEST__ = true;
global.__DEV__ = false;
