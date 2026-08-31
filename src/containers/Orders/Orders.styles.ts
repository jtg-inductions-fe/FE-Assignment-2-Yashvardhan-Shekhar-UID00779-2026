import { Box, Container, Stack, styled } from '@mui/material';

export const StyledOrdersContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

export const HeaderStack = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const OrdersPaper = styled(Box)({
    overflow: 'hidden',
});

export const EmptyStateBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}));
