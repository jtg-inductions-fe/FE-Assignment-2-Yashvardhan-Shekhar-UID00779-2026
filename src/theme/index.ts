import { createTheme } from '@mui/material/styles';

import { SCALING_FACTOR } from '@constant';

import { components } from './components';
import { breakpoints, mixins, palette, typography } from './foundations';

let theme = createTheme({
    palette,
    breakpoints,
    mixins,
    components,
    typography: {
        fontFamily: 'Inter',
        ...typography.typographyUtil,
    },
    spacing: (factor: number) =>
        theme.typography.pxToRem(factor * SCALING_FACTOR),
});

theme = createTheme(theme, {
    typography: {
        ...typography.typographyStyle(theme),
    },
});

export { theme };
