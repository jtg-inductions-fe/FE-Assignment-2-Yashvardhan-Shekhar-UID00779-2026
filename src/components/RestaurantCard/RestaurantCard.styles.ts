import { Card, CardActions, Chip, styled, Typography } from '@mui/material';

export const StyledChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    fontWeight: 'bold',
}));

export const DescriptionText = styled(Typography)({
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
});

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    padding: theme.typography.pxToRem(16),
    paddingTop: 0,
}));

export const StyledRestaurantCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(16),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[6],
    },
}));
