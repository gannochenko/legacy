require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

const { title, description, keywords } = require('./src/siteMeta').siteMeta;

module.exports = {
    siteMetadata: {
        title: title,
        description: description,
        author: '@gannochenko',
        keywords: keywords,
        siteUrl: 'https://ren39.ru',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: [
                    'roboto:300,400',
                    // 'source sans pro:300,400,400i,700'
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/static/assets`,
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `doma`,
                path: `${__dirname}/content/doma`,
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-relative-images`,
                        options: {
                            name: 'images',
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {},
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                defaultLayouts: {
                    default: require.resolve(
                        './src/components/PageContentLayout/PageContentLayout.tsx',
                    ),
                },
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-relative-images`,
                        options: {
                            name: 'images',
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1035,
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                exclude: ['/blog-drafts/', '/blog-drafts/*'],
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: title,
                short_name: title,
                description: description,
                start_url: '/',
                background_color: '#fff',
                theme_color: '#333',
                display: 'minimal-ui',
                categories: [], // https://github.com/w3c/manifest/wiki/Categories
                icon: 'static/assets/icon.png', // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        'gatsby-plugin-styled-components',
        'gatsby-plugin-typescript',
        'gatsby-plugin-catch-links',

        {
            resolve: `gatsby-plugin-gtag`,
            options: {
                // your google analytics tracking id
                trackingId: process.env.GA_TRACKING_ID || 'G-XYZ',
                // Puts tracking script in the head instead of the body
                head: false,
                // enable ip anonymization
                anonymize: true,
            },
        },
    ],
};
