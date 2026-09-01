import { Box, styled } from '@mui/material';

export const EmptyStateBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    paddingBlock: theme.spacing(8),
}));
