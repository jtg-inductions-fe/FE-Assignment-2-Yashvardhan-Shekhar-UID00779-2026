import { Card, styled } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(16),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[6],
    },
}));
