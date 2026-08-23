import { Avatar, Menu, Paper, styled } from '@mui/material';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.typography.pxToRem(32),
    height: theme.typography.pxToRem(32),
    backgroundColor: theme.palette.primary.main,
}));

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
    '& .MuiPaper-root': {
        minWidth: theme.typography.pxToRem(180),
        borderRadius: theme.typography.pxToRem(10),
    },
}));
