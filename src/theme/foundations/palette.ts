import { grey } from '@mui/material/colors';
import type { PaletteOptions } from '@mui/material/styles';

export const palette: PaletteOptions = {
    mode: 'light',
    primary: {
        light: '#2D594F',
        main: '#1A3C34',     
        dark: '#0F241F',
        contrastText: '#ffffff',
    },
    secondary: {
        light: '#DCB06B',
        main: '#C89243',      
        dark: '#A37229',
        contrastText: '#ffffff',
    },
    warning: {
        main: '#E07A5F',      
        dark: '#C05238',
    },
    background: {
        default: '#f7ede3',   
        paper: '#FFFFFF',     
    },
    text: {
        primary: '#0F241F',   
        secondary: grey[700], 
    },
};