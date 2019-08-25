import _ from '../src/lib/lodash';

// @ts-ignore
global._ = _;
// @ts-ignore
global.__TEST__ = true;
// @ts-ignore
global.__DEV__ = false;
// @ts-ignore
global.logger = {
    error: (message: string, error: Error) => {
        console.error(message);
        console.error(error);
    },
    info: (message: string) => {
        console.dir(message);
    },
    warn: () => {},
};
