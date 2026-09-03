import { Container, styled } from '@mui/material';

// extra padding at the bottom prevent bottom bar from hiding content
export const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.typography.pxToRem(10),
    paddingBottom: theme.typography.pxToRem(60),

    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.typography.pxToRem(10),
    },
}));
