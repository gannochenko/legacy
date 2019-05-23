const path = require('path');
const webpack = require('webpack');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = (env, argv) => {
    env = env || {};
    const development =
        argv.mode === 'development' || env.NODE_ENV === 'development';

    return {
        entry: path.join(__dirname, 'src/client.js'),
        mode: development ? 'development' : 'production',
        output: {
            filename: 'client.js',
            path: path.join(__dirname, 'build'),
            libraryTarget: 'commonjs',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                './build/server.js': './build/client.js',
            },
            symlinks: false,
        },
        externals: ['react', 'ew-internals', 'yup'],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/react',
                                    [
                                        '@babel/env',
                                        {
                                            targets: {
                                                browsers: ['last 2 versions'],
                                            },
                                        },
                                    ],
                                ],
                                plugins: [
                                    '@babel/plugin-proposal-object-rest-spread',
                                    '@babel/plugin-proposal-class-properties',

                                    'babel-plugin-styled-components',
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                // varname: path.join(__dirname, `src/lib/module.js`),
            }),
            new PeerDepsExternalsPlugin(),
            new webpack.DefinePlugin({
                __DEV__: development,
                __TEST__: false,
            }),
        ],
    };
};
