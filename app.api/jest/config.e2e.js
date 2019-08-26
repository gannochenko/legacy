const config = require('./config.js');

module.exports = {
    ...config,
    testRegex: '\\.e2e\\.(j|t)s$',
    globalSetup: '<rootDir>/../jest/env-seed.js',
};
