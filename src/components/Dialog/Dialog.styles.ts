import { Dialog, styled } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        padding: theme.typography.pxToRem(8),
    },
}));
