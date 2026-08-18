import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant';

export const palette: PaletteOptions = {
    mode: 'light',
    primary: {
        light: COLORS.primaryLight,
        main: COLORS.primaryMain,
        dark: COLORS.primaryDark,
        contrastText: COLORS.white,
    },
    secondary: {
        light: COLORS.secondaryLight,
        main: COLORS.secondaryMain,
        dark: COLORS.secondaryDark,
        contrastText: COLORS.white,
    },
    background: {
        default: COLORS.backgroundDefault,
        paper: COLORS.backgroundPaper,
    },
    text: {
        primary: COLORS.textPrimary,
        secondary: COLORS.textSecondary,
    },
};
