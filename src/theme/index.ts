import { createTheme } from '@mui/material/styles';

import { BORDER_RADIUS, SCALING_FACTOR } from '@constant';

// Customized MUI components themes
import { components } from './components';
// Customized foundation themes
import { breakpoints, mixins, palette, typography } from './foundations';

// Initialize the theme with base theme elements (excluding typography styles and spacing to ensure the theme has correct breakpoints and pxToRem function set.)
let theme = createTheme({
    palette,
    breakpoints,
    mixins,
    components,
    typography: {
        fontFamily: 'Inter, Arial, sans-serif',
        ...typography.typographyUtil,
    },
    shape: {
        borderRadius: BORDER_RADIUS,
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
