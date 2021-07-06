export default class SiteMapGenerator
{
    static generate()
    {
        const pages = [];

        pages.unshift({
            page: '/'
        });

        return pages;
    }
}

// Format:
// { page: '/pageWithViedeoAndImages',
//     lastmod: new Date().getTime(),
//     changefreq: 'monthly',
//     priority: 0.8,
//     images: [
//         { loc: '/myImg.jpg', },        // Only loc is required
//         { loc: '/myOtherImg.jpg',      // Below properties are optional
//             caption: "..", geo_location: "..", title: "..", license: ".."}
//     ],
//     videos: [
//         { loc: '/myVideo.jpg', },      // Only loc is required
//         { loc: '/myOtherVideo.jpg',    // Below properties are optional
//             thumbnail_loc: "..", title: "..", description: ".." etc }
//     ],
//     xhtmlLinks: [
//         { rel: 'alternate', hreflang: 'de', href: '/lang/deutsch' },
//         { rel: 'alternate', hreflang: 'de-ch', href: '/lang/schweiz-deutsch' },
//         { rel: 'alternate', hreflang: 'en', href: '/lang/english' }
//     ]
// },