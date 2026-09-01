import { Button, styled } from '@mui/material';

export const StyledAddButton = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        borderRadius: '50%',
        minWidth: 40,
        width: 40,
        height: 40,
        padding: 0,
    },
}));
