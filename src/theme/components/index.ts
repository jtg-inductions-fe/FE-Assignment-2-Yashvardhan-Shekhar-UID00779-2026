import type { Components } from '@mui/material/styles';

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: `
            html {
                font-size: 62.5%;
            }
            body {
                background-color: #f7ede3;
                color: #0F241F;
            }
        `,
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '1000px',
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '10px',
                paddingBottom: '10px',
                margin: '2px',
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.12)',
                },
            },
            containedPrimary: {
                backgroundColor: '#1A3C34',
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: '#0F241F',
                },
            },
            outlinedPrimary: {
                borderColor: '#1A3C34',
                color: '#1A3C34',
                '&:hover': {
                    borderColor: '#0F241F',
                    backgroundColor: 'rgba(26, 60, 52, 0.04)',
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.04)',
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            rounded: {
                borderRadius: '16px',
            },
        },
    },
    MuiDivider: {
        styleOverrides: {
            root: {
                borderColor: '#D1D5D2',
            },
        },
    },
};
