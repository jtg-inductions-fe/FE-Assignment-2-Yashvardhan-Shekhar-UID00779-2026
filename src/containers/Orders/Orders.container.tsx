import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import { ArrowBack, ReceiptLongOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

import { OrderItemDetails } from '@components';
import { getOrders } from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { startLoading } from '@utils';

export const Orders = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';
    const orders = useAppSelector((state) => state.orders.orders);

    useEffect(() => {
        startLoading(dispatch);
        void getOrders(dispatch);
    }, [dispatch]);

    return (
        orders && (
            <>
                <Box display="flex" flexDirection="column" pb={5}>
                    <Typography
                        variant="h2"
                        component="h1"
                        display="flex"
                        alignItems="center"
                    >
                        <IconButton onClick={() => void navigate(-1)}>
                            <ArrowBack />
                        </IconButton>
                        {isOwnerView ? 'Customer Orders' : 'Your Orders'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {isOwnerView
                            ? 'Manage order stages and keep customers updated.'
                            : 'Track current order stages and review order history.'}
                    </Typography>
                </Box>
                {orders && orders.length > 0 ? (
                    <Box overflow="hidden">
                        {orders.map((order) => (
                            <OrderItemDetails
                                key={order.id}
                                order={order}
                                isOwnerView={isOwnerView}
                            />
                        ))}
                    </Box>
                ) : (
                    <Box mt="30dvh" textAlign="center" color="text.secondary">
                        <ReceiptLongOutlined
                            sx={{ fontSize: theme.typography.pxToRem(64) }}
                        />
                        <Typography variant="h6">No orders found.</Typography>
                    </Box>
                )}
            </>
        )
    );
};
