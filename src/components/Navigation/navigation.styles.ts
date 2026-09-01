import { AppBar, Box, Button, Menu, Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,

    [theme.breakpoints.up('md')]: {
        display: 'none',
        pb: '2rem',
    },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
    root: {
        minWidth: theme.typography.pxToRem(180),
        borderRadius: theme.typography.pxToRem(10),
    },
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

export const DesktopNavBox = styled(Box)(({ theme }) => ({
    display: 'none',
    gap: theme.spacing(1),
    alignItems: 'center',
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

export const StyledNavButton = styled(Button)({});
