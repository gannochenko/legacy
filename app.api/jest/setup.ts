import _ from '../src/lib/lodash';

global._ = _;
// @ts-ignore
global.__TEST__ = true;
// @ts-ignore
global.__DEV__ = false;
// @ts-ignore
global.logger = {
    error: (message, error) => {
        console.error(message);
        console.error(error);
    },
    info: message => {
        console.dir(message);
    },
    warn: () => {},
};
