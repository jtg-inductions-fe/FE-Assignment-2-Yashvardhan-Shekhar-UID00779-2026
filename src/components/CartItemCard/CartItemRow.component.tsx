import { Add, Remove } from '@mui/icons-material';
import {
    Box,
    CardMedia,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import { addItemToCart, removeItemFromCart, useAppDispatch } from '@store';

import { QuantityControlStack, QuantityIconButton } from './CartItemRow.styles';
import { CartItemRowProps } from './CartItemRow.types';

export const CartItemRow = (props: CartItemRowProps) => {
    const { item } = props;
    const theme = useTheme();
    const dispatch = useAppDispatch();

    /** adds Item in the cart */
    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    /** removes Item from the cart  */
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
                    width: theme.typography.pxToRem(64),
                    height: theme.typography.pxToRem(64),
                    borderRadius: theme.typography.pxToRem(10),
                }}
            />
            <Box flexGrow={1} minWidth={10}>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {item.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    ₹{item.price} x {item.quantity}
                </Typography>
            </Box>
            <QuantityControlStack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Tooltip title="decrease quantity">
                    <QuantityIconButton
                        size="small"
                        color="primary"
                        onClick={handleRemoveFromCart}
                        aria-label="decrease quantity"
                    >
                        <Remove fontSize="small" />
                    </QuantityIconButton>
                </Tooltip>
                <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="primary.main"
                >
                    {item.quantity}
                </Typography>
                <Tooltip title="increase quantity">
                    <QuantityIconButton
                        size="small"
                        color="primary"
                        disabled={item.quantity >= item.stock}
                        onClick={handleAddToCart}
                        aria-label="increase quantity"
                    >
                        <Add fontSize="small" />
                    </QuantityIconButton>
                </Tooltip>
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
