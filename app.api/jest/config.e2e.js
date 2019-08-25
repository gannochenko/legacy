const config = require('./config.js');

module.exports = {
    ...config,
    testRegex: '\\.e2e\\.js$',
    globalSetup: '<rootDir>/../jest/env-seed.js',
};
