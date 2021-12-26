const { DefinePlugin } = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = {
    ...webpackConfig,
    plugins: [
        ...webpackConfig.plugins.splice(0, webpackConfig.plugins.length - 1),
        new DefinePlugin({
            __DEV__: false,
        }),
    ],
};
