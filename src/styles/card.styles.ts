import { Card, Paper, styled } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(16),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(16),
}));

export const StyledRestaurantCard = styled(StyledCard)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[6],
    },
}));
