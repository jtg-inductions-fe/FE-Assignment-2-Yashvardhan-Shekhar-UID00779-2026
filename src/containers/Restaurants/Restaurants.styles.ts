import { Box, Button, Container, styled, ToggleButton } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
    paddingBlock: theme.spacing(4),
}));

export const SearchFieldContainer = styled(Box)(({ theme }) => ({
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        width: 390,
    },
}));

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

export const EmptyStateBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    paddingBlock: theme.spacing(8),
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        borderRadius: '50%',
        minWidth: 40,
        width: 40,
        height: 40,
        padding: 0,
    },
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    paddingInline: theme.typography.pxToRem(16),
}));
