import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Stack,
    styled,
    Typography,
} from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const StyledChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS / 2),
}));

export const ImageContainer = styled(Box)({
    position: 'relative',
});

export const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
});

export const HeaderStack = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

export const DescriptionText = styled(Typography)({
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
});

interface StyledCardActionsProps {
    isOwnerView?: boolean;
}

export const StyledCardActions = styled(CardActions, {
    shouldForwardProp: (prop) => prop !== 'isOwnerView',
})<StyledCardActionsProps>(({ theme, isOwnerView }) => ({
    display: 'flex',
    justifyContent: isOwnerView ? 'flex-end' : 'stretch',
    alignItems: 'center',
    padding: theme.typography.pxToRem(16),
    paddingTop: 0,
}));

export const ActionBox = styled(Box)({
    width: '100%',
});

export const AddToCartButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    fontWeight: 'bold',
    textTransform: 'none',
}));

export const QuantityControlStack = styled(Stack)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
}));

export const QuantityIconButton = styled(IconButton)({
    width: '30%',
});

export const StyledCard = styled(Card)(({ theme }) => ({
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
