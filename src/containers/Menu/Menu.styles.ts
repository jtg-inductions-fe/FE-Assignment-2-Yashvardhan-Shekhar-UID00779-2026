import { Box, Button, Stack, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const HeaderStack = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
    paddingTop: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(10),
}));

export const MenuGrid = styled(Box)(({ theme }) => ({
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
    gridColumn: '1 / -1',
    textAlign: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),

    [theme.breakpoints.down('sm')]: {
        borderRadius: '50%',
        minWidth: 40,
        width: 40,
        height: 40,
        padding: 0,

        '& .MuiButton-startIcon': {
            margin: 0,
        },
    },
}));
