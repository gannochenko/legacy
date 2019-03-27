const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => {
    env = env || {};
    const development =
        argv.mode === 'development' || env.NODE_ENV === 'development';

    return {
        entry: path.join(__dirname, 'src/index.js'),
        mode: development ? 'development' : 'production',
        output: {
            path: path.join(__dirname, '../server/build/public'),
            filename: '[name].[contenthash:8].js',
            chunkFilename: '[name].[contenthash:8].chunk.js',
            publicPath: '/public/',
        },
        resolve: {
            extensions: ['.js'],
            symlinks: false,
        },
        // optimization: {
        //     minimize: !development,
        //     splitChunks: {
        //         chunks: 'all',
        //         name: false,
        //     },
        //     runtimeChunk: true,
        // },
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
                                            targets: {
                                                browsers: ['last 2 versions'],
                                            },
                                        },
                                    ],
                                ],
                                plugins: [
                                    '@babel/plugin-proposal-object-rest-spread',
                                ],
                                // cacheDirectory: true,
                                // cacheCompression: !development,
                                // compact: !development,
                            },
                        },
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
                                limit: 10000,
                            },
                        },
                    ],
                },
            ],
        },
        // https://webpack.js.org/configuration/devtool/
        devtool: development ? 'source-map' : null,
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.ProvidePlugin({
                _: path.join(__dirname, `src/lib/lodash.js`),
            }),
            new webpack.DefinePlugin({
                __DEV__: development,
                __TEST__: false,
            }),
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: path.join(__dirname, 'static/index.html'),
                        filename: path.join(
                            __dirname,
                            '../server/build/index.html',
                        ),
                        // hash: true,
                    },
                    development
                        ? undefined
                        : {
                              minify: {
                                  removeComments: true,
                                  collapseWhitespace: true,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          },
                ),
            ),
            new CopyPlugin([
                {
                    from: path.join(__dirname, 'public/**/*'),
                    to: path.join(__dirname + '../server/build/'),
                },
            ]),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3100,
                proxy: 'http://localhost:3000/',
                // ui: {
                //     port: 4200,
                // },
                notify: false,
                open: false,
            }),
            // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
            // new ManifestPlugin({
            //     fileName: 'asset-manifest.json',
            //     publicPath: '/public/',
            // }),
            // !development && new WorkboxWebpackPlugin.GenerateSW({
            //     clientsClaim: true,
            //     exclude: [/\.map$/, /asset-manifest\.json$/],
            //     importWorkboxFrom: 'cdn',
            //     navigateFallback: publicUrl + '/index.html',
            //     navigateFallbackBlacklist: [
            //         // Exclude URLs starting with /_, as they're likely an API call
            //         new RegExp('^/_'),
            //         // Exclude URLs containing a dot, as they're likely a resource in
            //         // public/ and not a SPA route
            //         new RegExp('/[^/]+\\.[^/]+$'),
            //     ],
            // }),
        ],
    };
};
