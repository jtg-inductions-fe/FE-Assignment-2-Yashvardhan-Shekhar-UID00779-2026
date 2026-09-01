import {
    Button,
    Card,
    CardActions,
    Chip,
    IconButton,
    Stack,
    styled,
    Typography,
} from '@mui/material';

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

export const QuantityIconButton = styled(IconButton)({
    width: '30%',
});

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.typography.pxToRem(16),
    paddingTop: 0,
}));

export const AddToCartButton = styled(Button)({
    fontWeight: 'bold',
    textTransform: 'none',
});

export const QuantityControlStack = styled(Stack)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[6],
    },
}));
