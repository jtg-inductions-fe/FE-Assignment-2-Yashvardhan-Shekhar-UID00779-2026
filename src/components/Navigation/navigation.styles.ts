import { AppBar, Box, Menu, MenuList, Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,

    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
    '.MuiMenu-list': {
        minWidth: theme.typography.pxToRem(180),
    },
}));

export const StyledMenuList = styled(MenuList)(({ theme }) => ({
    minWidth: theme.typography.pxToRem(180),
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
