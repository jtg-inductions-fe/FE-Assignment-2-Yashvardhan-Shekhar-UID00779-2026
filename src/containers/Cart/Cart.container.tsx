import { Fragment, useEffect, useState } from 'react';

import { Navigate, useNavigate } from 'react-router';

import { Check, DeleteOutlineOutlined } from '@mui/icons-material';
import { ArrowBack, ShoppingBagOutlined } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';

import { Button, CartItemRow } from '@components';
import { PATH } from '@constant';
import { checkoutPreview, placeOrder } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { CartItem } from '@types';
import { stopLoading } from '@utils';

import { StyledDivider, SummaryRow } from './Cart.styles';

export const Cart = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.cartItems);
    const role = useAppSelector((state) => state.user.role);

    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /** places order on clicked and resets the store cart */
    const handelPlaceOrder = async () => {
        setIsLoading(true);
        await placeOrder(dispatch, couponCode, navigate);
        setIsLoading(false);
    };

    const [subtotal, setSubtotal] = useState(
        cart.reduce(
            (sum: number, item: CartItem) => sum + item.price * item.quantity,
            0,
        ),
    );
    const [bookingFee, setBookingFee] = useState(Math.max(subtotal * 0.01, 20));
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(
        subtotal + bookingFee - discount,
    );

    const handleApplyCoupon = async (isRefreshing: boolean = false) => {
        try {
            if (isApplyingCoupon || cart.length == 0) return;

            const code = couponCode.trim();

            if (!isRefreshing && discount > 0) {
                setDiscount(0);
                setCouponCode('');
                setGrandTotal(subtotal + bookingFee);
                return;
            }

            setIsApplyingCoupon(true);
            const preview = await checkoutPreview(code, dispatch);

            if (preview) {
                setSubtotal(Number(preview.subtotal));
                setBookingFee(Number(preview.booking_fee));
                setDiscount(Number(preview.discount));
                setGrandTotal(Number(preview.grand_total));
            }
        } finally {
            setIsApplyingCoupon(false);
            stopLoading(dispatch);
        }
    };

    useEffect(() => {
        void handleApplyCoupon(true);
    }, [cart]);

    return role === 'owner' ? (
        <Navigate to={PATH.HOME} />
    ) : (
        <>
            <Box
                display="flex"
                flexDirection="column"
                component="section"
                gap={1}
                mb={4}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                >
                    <IconButton onClick={() => void navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    Order Checkout
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Review your items and complete your order.
                </Typography>
            </Box>
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
                    {discount > 0 && (
                        <SummaryRow>
                            <Typography variant="body1" color="text.secondary">
                                Discount
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                - ₹{discount.toFixed(2)}
                            </Typography>
                        </SummaryRow>
                    )}
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
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems="stretch"
                    >
                        <Box
                            component="form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                void handleApplyCoupon();
                            }}
                            sx={{ flex: 1 }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                label="Coupon code"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                disabled={isApplyingCoupon || discount > 0}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Apply coupon"
                                                    color="default"
                                                    edge="end"
                                                    type="submit"
                                                    disabled={
                                                        !couponCode.trim() ||
                                                        isApplyingCoupon
                                                    }
                                                    loading={isApplyingCoupon}
                                                >
                                                    {discount > 0 ? (
                                                        <DeleteOutlineOutlined />
                                                    ) : (
                                                        <Check />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={isApplyingCoupon}
                            loading={isLoading}
                            loadingPosition="end"
                            onClick={() => void handelPlaceOrder()}
                            sx={{ flex: 1, whiteSpace: 'nowrap' }}
                        >
                            Place Order ₹{grandTotal.toFixed(2)}
                        </Button>
                    </Stack>
                </Box>
            ) : (
                <Box mt="30dvh" textAlign="center" color="text.secondary">
                    <ShoppingBagOutlined
                        sx={{ fontSize: theme.typography.pxToRem(64) }}
                    />
                    <Typography variant="h6">Your cart is empty.</Typography>
                    <Typography variant="body2">
                        Add some delicious items from the menu to get started!
                    </Typography>
                </Box>
            )}
        </>
    );
};
