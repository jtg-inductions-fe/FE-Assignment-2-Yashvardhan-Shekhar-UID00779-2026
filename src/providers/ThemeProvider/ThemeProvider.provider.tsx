import { ReactNode } from 'react';

import { CssBaseline, ThemeProvider as ThemeProviderMui } from '@mui/material';

import { theme } from '@theme';

// theme provider of provided by mui and reset css
export const ThemeProvider = ({ children }: { children: ReactNode }) => (
    <ThemeProviderMui theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProviderMui>
);
