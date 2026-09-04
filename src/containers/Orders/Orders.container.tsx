import { useEffect } from 'react';

import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';

import { OrderItemDetails } from '@components';
import { getOrders } from '@services';
import { useAppDispatch, useAppSelector } from '@store';

export const Orders = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';
    const orders = useAppSelector((state) => state.orders.orders);

    useEffect(() => {
        void getOrders(dispatch);
    }, [dispatch]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack pb={theme.typography.pxToRem(20)}>
                <Typography variant="h2" component="h1">
                    {isOwnerView ? 'Customer Orders' : 'Your Orders'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {isOwnerView
                        ? 'Manage order stages and keep customers updated.'
                        : 'Track current order stages and review order history.'}
                </Typography>
            </Stack>

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
                <Box textAlign="center" color="text.secondary">
                    <ReceiptLongOutlinedIcon
                        sx={{ fontSize: theme.typography.pxToRem(60) }}
                    />
                    <Typography variant="h6">No orders found.</Typography>
                </Box>
            )}
        </Container>
    );
};
