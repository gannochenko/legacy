import { palette } from 'sc-companion';

export default {
    font: {
        normal: '1rem',
        small: '0.8rem',
        xSmall: '0.6rem',
    },

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
    error: {
        color: palette.monza,
    },
    input: {
        color: {
            hover: palette.sumacDyed,
            hout: palette.cascade,
            error: palette.monza,
        },
    },
    button: {
        color: {
            hover: palette.cascade,
            hout: palette.black,
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
