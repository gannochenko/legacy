import { palette } from 'sc-companion';

export default {
    body: {
        color: palette.black,
        background: {
            color: palette.white,
        },
    },
    link: {
        color: {
            hover: palette.sumacDyed,
            hout: palette.brightGoldenYellow,
        },
    },
    menu: {
        subHeader: {
            color: palette.cascade,
        },
    },
    footer: {
        background: {
            color: palette.harborRat,
        },
    },
    grid: {
        resolution: 12,
        breakpoints: {
            xl: 1200,
            lg: 992,
            md: 768,
            sm: 576,
        },
    },
};
