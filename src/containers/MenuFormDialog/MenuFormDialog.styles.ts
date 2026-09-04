import { DialogActions, DialogContent, styled } from '@mui/material';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    paddingInline: theme.spacing(0.5),

    [theme.breakpoints.up('sm')]: {
        paddingInline: theme.spacing(2),
    },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(4),
    gap: theme.spacing(1),
}));
