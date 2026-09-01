import { Box, Container, styled } from '@mui/material';

export const StyledOrdersContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

export const OrdersPaper = styled(Box)({
    overflow: 'hidden',
});
