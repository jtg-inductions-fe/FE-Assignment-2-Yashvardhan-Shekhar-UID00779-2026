import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { CardMedia, IconButton, Stack, Typography } from '@mui/material';

import { IMAGE } from '@constant';
import {
    addItemToCart,
    AppDispatch,
    removeItemFromCart,
    useAppSelector,
} from '@store';
import { MenuItem } from '@types';

import {
    ActionBox,
    AddToCartButton,
    DescriptionText,
    HeaderStack,
    ImageContainer,
    QuantityControlStack,
    QuantityIconButton,
    StyledCard,
    StyledCardActions,
    StyledCardContent,
    StyledChip,
} from './MenuCard.styles';

type MenuCardProps = {
    item: MenuItem;
    isOwnerView?: boolean;
    dispatch: AppDispatch;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

export const MenuCard = ({
    item,
    isOwnerView = false,
    dispatch,
    onEdit,
    onDelete,
}: MenuCardProps) => {
    const quantity = useAppSelector((state): number => {
        const res = state.cart.find((it) => it.id === item.id);
        return res ? res.quantity : 0;
    });

    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeItemFromCart(item));
    };

    const isOutOfStock = item.stock <= 0;
    const isInCart = quantity > 0;

    return (
        <StyledCard elevation={2}>
            <ImageContainer>
                <CardMedia
                    component="img"
                    height="180"
                    image={item.image || IMAGE}
                    alt={item.name}
                    onError={(e) => (e.currentTarget.src = IMAGE)}
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
            </ImageContainer>

            <StyledCardContent>
                <HeaderStack
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
                </HeaderStack>

                <DescriptionText variant="body2" color="text.secondary">
                    {item.description ||
                        `Enjoy our ${item.name}! ${
                            item.stock > 1
                                ? `Get a pack of ${item.stock} for`
                                : 'Available for'
                        } only ₹${item.price * (item.stock || 1)}.`}
                </DescriptionText>
            </StyledCardContent>

            <StyledCardActions isOwnerView={isOwnerView}>
                {/* Customer View Controls */}
                {!isOwnerView && (
                    <ActionBox>
                        {!isInCart ? (
                            <AddToCartButton
                                fullWidth
                                variant="contained"
                                startIcon={<ShoppingBagIcon />}
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
                                    <RemoveIcon fontSize="small" />
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
                                    disabled={
                                        typeof item.stock === 'number' &&
                                        quantity >= item.stock
                                    }
                                    onClick={handleAddToCart}
                                    aria-label="add item to cart"
                                >
                                    <AddIcon fontSize="small" />
                                </QuantityIconButton>
                            </QuantityControlStack>
                        )}
                    </ActionBox>
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
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete?.(item.id)}
                            aria-label="delete menu item"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                )}
            </StyledCardActions>
        </StyledCard>
    );
};
