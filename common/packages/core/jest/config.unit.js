const config = require('./config.js');

module.exports = Object.assign({}, config, {
    testRegex: '\\.test\\.(j|t)s$',
});
