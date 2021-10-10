const { DefinePlugin } = require('webpack');
const webpackConfig = require('./webpack.config');

module.exports = {
    ...webpackConfig,
    externals: undefined,
    plugins: [
        ...webpackConfig.plugins,
        new DefinePlugin({
            __DEV__: false,
        }),
    ],
};
