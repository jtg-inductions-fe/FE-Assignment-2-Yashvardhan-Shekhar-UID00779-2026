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
        },
    },
};
