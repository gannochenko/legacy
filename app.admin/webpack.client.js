const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
    env = env || {};
    const development =
        argv.mode === 'development' || env.NODE_ENV === 'development';

    return {
        devtool: 'inline-source-map',
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3001',
            'webpack/hot/only-dev-server',
            './client/index',
        ],
        target: 'web',
        mode: development ? 'development' : 'production',
        resolve: {
            extensions: ['.js', '.jsx'],
            symlinks: false,
        },
        module: {
            rules: [
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                },
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
                                            modules: false,
                                            targets: {
                                                browsers: ['last 2 versions'],
                                            },
                                        },
                                    ],
                                ],
                                plugins: [
                                    '@babel/plugin-proposal-object-rest-spread',
                                ],
                            },
                        },
                    ],
                    include: [
                        path.join(__dirname, 'client'),
                        path.join(__dirname, 'common'),
                    ],
                },
                {
                    test: /\.(txt|html)$/,
                    use: 'raw-loader',
                },
                {
                    test: /\.(jpe?g|gif|png|svg|ico)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.ProvidePlugin({
                _: [path.join(__dirname, `common/lib/lodash.js`), 'default'],
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                __CLIENT__: true,
                __SERVER__: false,
                __DEV__: development,
                __TEST__: false,
            }),
        ],
        devServer: {
            host: '0.0.0.0',
            port: 3001,
            historyApiFallback: true,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        },
        output: {
            path: path.join(__dirname, '.build'),
            publicPath: 'http://localhost:3001/',
            filename: 'client.js',
        },
    };
};
