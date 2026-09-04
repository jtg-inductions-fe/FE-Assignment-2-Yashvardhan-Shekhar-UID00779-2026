import { Add, Delete, Edit, Remove, ShoppingBag } from '@mui/icons-material';
import {
    Box,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { Button, Card, Tooltip } from '@components';
import { addItemToCart, removeItemFromCart, useAppSelector } from '@store';

import {
    QuantityControlStack,
    QuantityIconButton,
    StyledCardActions,
    StyledChip,
} from './MenuCard.styles';
import { MenuCardProps } from './MenuCard.types';

export const MenuCard = (props: MenuCardProps) => {
    const { item, isOwnerView, dispatch, onEdit, onDelete } = props;
    const theme = useTheme();

    const quantity = useAppSelector((state): number => {
        const res = state.cart.cartItems.find((it) => it.id === item.id);
        return res ? res.quantity : 0;
    });

    const isOutOfStock = item.stock <= 0;
    const isInCart = quantity > 0;

    /**
     * adds item in the cart
     */
    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    /**
     * removes item from the card
     */
    const handleRemoveFromCart = () => {
        dispatch(removeItemFromCart(item));
    };

    return (
        <Card elevation={2}>
            <Box>
                <CardMedia
                    component="img"
                    height="180"
                    image={
                        item.image ||
                        '/src/assets/images/food-illustration.webp'
                    }
                    alt={item.name}
                    onError={(e) => {
                        e.currentTarget.src =
                            '/src/assets/images/food_illustration.webp';
                    }}
                    loading="lazy"
                    sx={{
                        filter: isOutOfStock ? 'grayscale(70%)' : 'none',
                        opacity: isOutOfStock ? 0.5 : 1,
                    }}
                />
                {isOutOfStock && (
                    <StyledChip
                        label="Out of Stock"
                        color="default"
                        size="small"
                    />
                )}
            </Box>
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    mb={1.5}
                >
                    <Typography variant="h6" component="h2" noWrap>
                        {item.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={isOutOfStock ? 'textDisabled' : 'primary'}
                        fontWeight="bold"
                    >
                        ₹{item.price}
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ...theme.mixins.lineClamp(3) }}
                >
                    {item.description ||
                        `Enjoy our ${item.name}, available for just ₹${item.price}.`}
                </Typography>
            </CardContent>
            <StyledCardActions
                sx={{ justifyContent: isOwnerView ? 'flex-end' : 'stretch' }}
            >
                {!isOwnerView && (
                    <Box width="100%">
                        {!isInCart ? (
                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<ShoppingBag />}
                                disabled={isOutOfStock}
                                onClick={handleAddToCart}
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                }}
                            >
                                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                        ) : (
                            <QuantityControlStack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Tooltip title="Remove item from cart">
                                    <QuantityIconButton
                                        size="small"
                                        color="primary"
                                        onClick={handleRemoveFromCart}
                                        aria-label="remove item from cart"
                                    >
                                        <Remove fontSize="small" />
                                    </QuantityIconButton>
                                </Tooltip>
                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    {quantity}
                                </Typography>
                                <Tooltip title="Add item to cart">
                                    <QuantityIconButton
                                        size="small"
                                        color="primary"
                                        disabled={quantity >= item.stock}
                                        onClick={handleAddToCart}
                                        aria-label="add item to cart"
                                    >
                                        <Add fontSize="small" />
                                    </QuantityIconButton>
                                </Tooltip>
                            </QuantityControlStack>
                        )}
                    </Box>
                )}
                {isOwnerView && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEdit(item.id)}
                            aria-label="edit menu item"
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(item.id)}
                            aria-label="delete menu item"
                        >
                            <Delete />
                        </IconButton>
                    </Stack>
                )}
            </StyledCardActions>
        </Card>
    );
};
