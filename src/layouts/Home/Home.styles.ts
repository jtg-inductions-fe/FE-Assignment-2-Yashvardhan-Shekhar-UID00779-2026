import { Container, styled } from '@mui/material';

// extra padding at the bottom prevent bottom bar from hiding content
export const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    paddingBottom: theme.typography.pxToRem(70),

    [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(4),
    },
}));
