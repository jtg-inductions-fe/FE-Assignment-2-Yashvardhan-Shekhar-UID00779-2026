import { Dialog, styled } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '.MuiDialog-paper': {
        padding: theme.typography.pxToRem(8),
    },
}));
