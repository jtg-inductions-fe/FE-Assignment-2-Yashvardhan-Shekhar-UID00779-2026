import { Card, Chip, styled } from '@mui/material';

export const StyledChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    fontWeight: 'bold',
}));

export const StyledRestaurantCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(16),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[6],
    },
}));
