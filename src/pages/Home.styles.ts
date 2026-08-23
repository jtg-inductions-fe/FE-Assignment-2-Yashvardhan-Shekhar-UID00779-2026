import { Container, styled } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
    maxWidth: 'xl',
    padding: theme.typography.pxToRem(10),
    [theme.breakpoints.down('md')]: {
        paddingBottom: theme.typography.pxToRem(60),
    },
}));
