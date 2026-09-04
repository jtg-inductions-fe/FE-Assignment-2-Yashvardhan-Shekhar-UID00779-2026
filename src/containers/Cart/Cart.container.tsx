import { Fragment, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router';

import { ShoppingBagOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { Button, CartItemRow } from '@components';
import { PATH } from '@constant';
import { placeOrder } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { CartItem } from '@types';

import { StyledDivider, SummaryRow } from './Cart.styles';

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.cartItems);
    const role = useAppSelector((state) => state.user.role);

    const [isLoading, setIsLoading] = useState(false);

    /** places order on clicked and resets the store cart */
    const handelPlaceOrder = async () => {
        setIsLoading(true);
        await placeOrder(dispatch);
        setIsLoading(false);
        await navigate(PATH.HOME);
    };

    const subtotal = useMemo(
        () =>
            cart.reduce(
                (sum: number, item: CartItem) =>
                    sum + item.price * item.quantity,
                0,
            ),
        [cart],
    );
    const bookingFee = Math.max(Math.min(subtotal * 0.1, 200), 40);
    const grandTotal = subtotal + bookingFee;

    useEffect(() => {
        if (role === 'owner') {
            void navigate(PATH.HOME);
        }
    }, [role, navigate]);

    return (
        <>
            <Stack component="section" spacing={1} mb={4}>
                <Typography variant="h2" component="h1" fontWeight="bold">
                    Order Checkout
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Review your items and complete your order.
                </Typography>
            </Stack>
            {cart.length > 0 ? (
                <Box>
                    {cart.map((item: CartItem) => (
                        <Fragment key={item.id}>
                            <CartItemRow item={item} />
                            <StyledDivider />
                        </Fragment>
                    ))}
                    <SummaryRow>
                        <Typography variant="body1" color="text.secondary">
                            Subtotal
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                            ₹{subtotal.toFixed(2)}
                        </Typography>
                    </SummaryRow>
                    <SummaryRow>
                        <Typography variant="body1" color="text.secondary">
                            Booking Fee
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                            ₹{bookingFee.toFixed(2)}
                        </Typography>
                    </SummaryRow>
                    <StyledDivider />
                    <SummaryRow mb={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Total Payable
                        </Typography>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary.main"
                        >
                            ₹{grandTotal.toFixed(2)}
                        </Typography>
                    </SummaryRow>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        loading={isLoading}
                        loadingPosition="end"
                        onClick={() => void handelPlaceOrder()}
                    >
                        Place Order ₹{grandTotal.toFixed(2)}
                    </Button>
                </Box>
            ) : (
                <Box textAlign="center">
                    <ShoppingBagOutlined
                        sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                        Your cart is empty.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Add some delicious items from the menu to get started!
                    </Typography>
                </Box>
            )}
        </>
    );
};
