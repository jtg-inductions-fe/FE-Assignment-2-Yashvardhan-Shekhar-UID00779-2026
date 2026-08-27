import { Fragment, useState } from 'react';

import { useNavigate } from 'react-router';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Box, Container, Typography } from '@mui/material';

import { Button, CartItemRow } from '@components';
import { placeOrder } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { CartItem } from '@types';

import {
    EmptyStateBox,
    HeaderStack,
    StyledDivider,
    SummaryRow,
    SummaryRowLast,
} from './Cart.styles';

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.cartItems);

    const [isLoading, setIsLoading] = useState(false);

    const handelPlaceOrder = async () => {
        setIsLoading(true);
        await placeOrder(dispatch);
        setIsLoading(false);
        await navigate('/home');
    };

    const subtotal = cart.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0,
    );
    const bookingFee = Math.min(subtotal * 0.1, 100);
    const grandTotal = subtotal + bookingFee;

    return (
        <Container maxWidth="xl">
            <HeaderStack spacing={1}>
                <Typography variant="h2" component="h1" fontWeight={800}>
                    Order Checkout
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Review your items and complete your order.
                </Typography>
            </HeaderStack>

            {cart.length > 0 ? (
                <Box>
                    {cart.map((item: CartItem) => (
                        <Fragment key={item.id}>
                            <CartItemRow item={item} dispatch={dispatch} />
                            <StyledDivider />
                        </Fragment>
                    ))}

                    <SummaryRow>
                        <Typography variant="body1" color="text.secondary">
                            Subtotal
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                            ₹{subtotal.toFixed(2)}
                        </Typography>
                    </SummaryRow>

                    <SummaryRow>
                        <Typography variant="body1" color="text.secondary">
                            Booking Fee
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                            ₹{bookingFee.toFixed(2)}
                        </Typography>
                    </SummaryRow>

                    <StyledDivider />

                    <SummaryRowLast>
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
                    </SummaryRowLast>

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
                <EmptyStateBox>
                    <ShoppingBagOutlinedIcon
                        sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                        Your cart is empty.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Add some delicious items from the menu to get started!
                    </Typography>
                </EmptyStateBox>
            )}
        </Container>
    );
};
