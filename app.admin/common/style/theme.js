import { palette, zIxEverest } from 'sc-companion';

export default {
    // general settings
    font: {
        normal: '1rem',
        small: '0.8rem',
        xSmall: '0.6rem',
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
    zIndex: {},

    // common elements
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

    // custom elements
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
    checkbox: {
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

    dropPanel: {
        zIndex: zIxEverest,
        panelVOffset: '0.5rem',
    },
};
