import { Button, styled } from '@mui/material';

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
