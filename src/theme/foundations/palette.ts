import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

export const palette: PaletteOptions = {
    mode: 'light',
    primary: {
        light: COLORS.PRIMARY.LIGHT,
        main: COLORS.PRIMARY.MAIN,
        dark: COLORS.PRIMARY.DARK,
        contrastText: COLORS.WHITE,
    },
    secondary: {
        light: COLORS.SECONDARY.LIGHT,
        main: COLORS.SECONDARY.MAIN,
        dark: COLORS.SECONDARY.DARK,
        contrastText: COLORS.WHITE,
    },
    background: {
        default: COLORS.BACKGROUND.DEFAULT,
        paper: COLORS.BACKGROUND.PAPER,
    },
    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
    },
};
