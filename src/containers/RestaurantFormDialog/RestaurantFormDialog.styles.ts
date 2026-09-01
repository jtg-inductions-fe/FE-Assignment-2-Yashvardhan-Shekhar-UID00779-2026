import { DialogActions, DialogContent, styled } from '@mui/material';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),

    [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.typography.pxToRem(16),
    gap: theme.spacing(1),
}));
