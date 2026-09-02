import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, CardMedia, Stack, Typography, useTheme } from '@mui/material';

import { addItemToCart, removeItemFromCart, useAppDispatch } from '@store';

import { QuantityControlStack, QuantityIconButton } from './CartItemRow.styles';
import { CartItemRowProps } from './CartItemRow.types';

export const CartItemRow = (props: CartItemRowProps) => {
    const { item } = props;
    const theme = useTheme();
    const dispatch = useAppDispatch();

    /**
     * adds Item in the cart
     * @returns nothing void
     */
    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    /**
     * removes Item from the cart
     * @returns nothing void
     */
    const handleRemoveFromCart = () => {
        dispatch(removeItemFromCart(item));
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2} paddingBlock={2}>
            <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                loading="lazy"
                sx={{
                    height: theme.typography.pxToRem(64),
                    width: theme.typography.pxToRem(64),
                    borderRadius: theme.typography.pxToRem(10),
                }}
            />

            <Box flexGrow={1} minWidth={10}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ₹{item.price} x {item.quantity}
                </Typography>
            </Box>

            <QuantityControlStack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <QuantityIconButton
                    size="small"
                    color="primary"
                    onClick={handleRemoveFromCart}
                    aria-label="decrease quantity"
                >
                    <RemoveIcon fontSize="small" />
                </QuantityIconButton>

                <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="primary.main"
                >
                    {item.quantity}
                </Typography>

                <QuantityIconButton
                    size="small"
                    color="primary"
                    disabled={item.quantity >= item.stock}
                    onClick={handleAddToCart}
                    aria-label="increase quantity"
                >
                    <AddIcon fontSize="small" />
                </QuantityIconButton>
            </QuantityControlStack>

            <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
                minWidth="5%"
                textAlign="right"
            >
                ₹{item.price * item.quantity}
            </Typography>
        </Stack>
    );
};
