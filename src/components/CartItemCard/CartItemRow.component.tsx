import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography } from '@mui/material';

import { IMAGE } from '@constant';
import { addItemToCart, AppDispatch, removeItemFromCart } from '@store';
import { CartItem } from '@types';

import {
    InfoContainer,
    ItemMedia,
    QuantityControlStack,
    QuantityIconButton,
    RowContainer,
} from './CartItemRow.styles';

type CartItemRowProps = {
    item: CartItem;
    dispatch: AppDispatch;
};

export const CartItemRow = ({ item, dispatch }: CartItemRowProps) => {
    const handleAddToCart = () => {
        dispatch(addItemToCart(item));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeItemFromCart(item));
    };

    return (
        <RowContainer direction="row" alignItems="center" spacing={2}>
            <ItemMedia
                component="img"
                image={item.image || IMAGE}
                alt={item.name}
                onError={(e) => (e.currentTarget.src = IMAGE)}
                loading="lazy"
            />

            <InfoContainer>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ₹{item.price} x {item.quantity}
                </Typography>
            </InfoContainer>

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
                sx={{ minWidth: 70, textAlign: 'right' }}
            >
                ₹{item.price * item.quantity}
            </Typography>
        </RowContainer>
    );
};
