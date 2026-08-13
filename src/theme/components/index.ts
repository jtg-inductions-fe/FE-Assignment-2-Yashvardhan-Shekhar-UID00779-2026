import type { Components } from '@mui/material/styles';

import inter400Woff from '@assets/fonts/inter/inter-latin-400-normal.woff';
import inter400Woff2 from '@assets/fonts/inter/inter-latin-400-normal.woff2';
import inter500Woff from '@assets/fonts/inter/inter-latin-500-normal.woff';
import inter500Woff2 from '@assets/fonts/inter/inter-latin-500-normal.woff2';
import inter600Woff from '@assets/fonts/inter/inter-latin-600-normal.woff';
import inter600Woff2 from '@assets/fonts/inter/inter-latin-600-normal.woff2';
import inter700Woff from '@assets/fonts/inter/inter-latin-700-normal.woff';
import inter700Woff2 from '@assets/fonts/inter/inter-latin-700-normal.woff2';

const fontFaceDeclarations = `
    @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url('${inter400Woff2}') format('woff2'),
            url('${inter400Woff}') format('woff');
    }

    @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-display: swap;
        font-weight: 500;
        src: url('${inter500Woff2}') format('woff2'),
            url('${inter500Woff}') format('woff');
    }

    @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-display: swap;
        font-weight: 600;
        src: url('${inter600Woff2}') format('woff2'),
            url('${inter600Woff}') format('woff');
    }

    @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-display: swap;
        font-weight: 700;
        src: url('${inter700Woff2}') format('woff2'),
            url('${inter700Woff}') format('woff');
    }
`;

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            fontFaceDeclarations,
            html: {
                fontSize: '62.5%',
            },
            body: {
                backgroundColor: '#f7ede3',
                color:'#0F241F',
            },
        },
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
