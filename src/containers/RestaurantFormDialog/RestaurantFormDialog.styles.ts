import { DialogContent, styled } from '@mui/material';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    paddingInline: theme.spacing(0.5),

    [theme.breakpoints.up('sm')]: {
        paddingInline: theme.spacing(2),
    },
}));
