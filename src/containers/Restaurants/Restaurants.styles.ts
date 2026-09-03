import { Box, Button, styled, ToggleButton } from '@mui/material';

export const RestaurantGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    minWidth: 40,
    width: 40,
    height: 40,
    gap: 8,

    '.MuiButton-startIcon': {
        margin: 0,
    },

    [theme.breakpoints.up('sm')]: {
        borderRadius: theme.shape.borderRadius,
        width: 'auto',
        height: 'auto',
    },
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    paddingInline: theme.typography.pxToRem(16),
}));
