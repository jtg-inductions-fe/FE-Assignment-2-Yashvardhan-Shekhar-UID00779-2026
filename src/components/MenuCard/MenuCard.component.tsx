import { Add, Delete, Edit, Remove, ShoppingBag } from '@mui/icons-material';
import {
    Box,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import { Card } from '@components';
import { addItemToCart, removeItemFromCart, useAppSelector } from '@store';

import {
    AddToCartButton,
    DescriptionText,
    QuantityControlStack,
    QuantityIconButton,
    StyledCardActions,
    StyledChip,
} from './MenuCard.styles';
import { MenuCardProps } from './MenuCard.types';

export const MenuCard = (props: MenuCardProps) => {
    const { item, isOwnerView = false, dispatch, onEdit, onDelete } = props;

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
                    image={item.image}
                    alt={item.name}
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
                >
                    <Typography variant="h6" component="h2" noWrap>
                        {item.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="primary.main"
                        fontWeight="bold"
                    >
                        ₹{item.price}
                    </Typography>
                </Stack>

                <DescriptionText variant="body2" color="text.secondary">
                    {item.description ||
                        `Enjoy our ${item.name}! ${
                            item.stock > 1
                                ? `Get a pack of ${item.stock} for`
                                : 'Available for'
                        } only ₹${item.price * Math.min(item.stock, 3)}.`}
                </DescriptionText>
            </CardContent>

            <StyledCardActions
                sx={{ justifyContent: isOwnerView ? 'flex-end' : 'stretch' }}
            >
                {/* Customer View Controls */}
                {!isOwnerView && (
                    <Box width="100%">
                        {!isInCart ? (
                            <AddToCartButton
                                fullWidth
                                variant="contained"
                                startIcon={<ShoppingBag />}
                                disabled={isOutOfStock}
                                onClick={handleAddToCart}
                            >
                                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </AddToCartButton>
                        ) : (
                            <QuantityControlStack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <QuantityIconButton
                                    size="small"
                                    color="primary"
                                    onClick={handleRemoveFromCart}
                                    aria-label="remove item from cart"
                                >
                                    <Remove fontSize="small" />
                                </QuantityIconButton>

                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    {quantity}
                                </Typography>

                                <QuantityIconButton
                                    size="small"
                                    color="primary"
                                    disabled={quantity >= item.stock}
                                    onClick={handleAddToCart}
                                    aria-label="add item to cart"
                                >
                                    <Add fontSize="small" />
                                </QuantityIconButton>
                            </QuantityControlStack>
                        )}
                    </Box>
                )}

                {/* Owner View Controls */}
                {isOwnerView && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEdit?.(item.id)}
                            aria-label="edit menu item"
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete?.(item.id)}
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
