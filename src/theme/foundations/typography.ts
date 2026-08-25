import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { FONT_WEIGHTS, HTML_FONT_SIZE } from '@constant';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

// TODO: Add the necessary typographies here.
/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */

const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter, Arial, sans-serif',
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightRegular: FONT_WEIGHTS.REGULAR,
    fontWeightMedium: FONT_WEIGHTS.MEDIUM,
    fontWeightBold: FONT_WEIGHTS.BOLD,

    // Headings
    h1: {
        fontSize: typographyUtil.pxToRem(28),
        fontWeight: FONT_WEIGHTS.BOLD,
        lineHeight: typographyUtil.pxToRem(36),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(40),
            lineHeight: typographyUtil.pxToRem(52),
        },
    },

    h2: {
        fontSize: typographyUtil.pxToRem(24),
        fontWeight: FONT_WEIGHTS.BOLD,
        lineHeight: typographyUtil.pxToRem(32),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(32),
            lineHeight: typographyUtil.pxToRem(42),
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(22),
        fontWeight: FONT_WEIGHTS.SEMIBOLD,
        lineHeight: typographyUtil.pxToRem(30),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(28),
            lineHeight: typographyUtil.pxToRem(36),
        },
    },

    h4: {
        fontSize: typographyUtil.pxToRem(20),
        fontWeight: FONT_WEIGHTS.SEMIBOLD,
        lineHeight: typographyUtil.pxToRem(28),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(24),
            lineHeight: typographyUtil.pxToRem(32),
        },
    },

    h5: {
        fontSize: typographyUtil.pxToRem(18),
        fontWeight: FONT_WEIGHTS.SEMIBOLD,
        lineHeight: typographyUtil.pxToRem(26),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(20),
            lineHeight: typographyUtil.pxToRem(28),
        },
    },

    h6: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONT_WEIGHTS.MEDIUM,
        lineHeight: typographyUtil.pxToRem(22),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(18),
            lineHeight: typographyUtil.pxToRem(24),
        },
    },

    subtitle1: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONT_WEIGHTS.MEDIUM,
        lineHeight: typographyUtil.pxToRem(24),
    },

    subtitle2: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONT_WEIGHTS.MEDIUM,
        lineHeight: typographyUtil.pxToRem(20),
    },

    body1: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONT_WEIGHTS.REGULAR,
        lineHeight: typographyUtil.pxToRem(22),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(16),
            lineHeight: typographyUtil.pxToRem(24),
        },
    },

    body2: {
        fontSize: typographyUtil.pxToRem(13),
        fontWeight: FONT_WEIGHTS.REGULAR,
        lineHeight: typographyUtil.pxToRem(18),
    },

    button: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONT_WEIGHTS.MEDIUM,
        lineHeight: typographyUtil.pxToRem(20),
        textTransform: 'none',
    },

    caption: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: FONT_WEIGHTS.REGULAR,
        lineHeight: typographyUtil.pxToRem(16),
    },

    overline: {
        fontSize: typographyUtil.pxToRem(10),
        fontWeight: FONT_WEIGHTS.MEDIUM,
        lineHeight: typographyUtil.pxToRem(14),
        textTransform: 'uppercase',
    },
});

export const typography = { typographyStyle, typographyUtil };
