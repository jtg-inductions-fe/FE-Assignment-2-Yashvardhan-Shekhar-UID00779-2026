import { useState } from 'react';

import { useLoaderData } from 'react-router';

import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import { OrderItemDetails } from '@components';
import { useAppSelector } from '@store';
import { Order, OrderStatus } from '@types';

import { OrdersPaper, StyledOrdersContainer } from './Orders.styles';

export const Orders = () => {
    const theme = useTheme();
    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';
    const [orders, setOrders] = useState<Order[]>(useLoaderData());

    const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
        setOrders((prev) =>
            prev.map((ord) =>
                ord.id === orderId ? { ...ord, status: nextStatus } : ord,
            ),
        );
    };

    return (
        <StyledOrdersContainer maxWidth="xl">
            <Stack pb={theme.typography.pxToRem(20)}>
                <Typography variant="h1" component="h1">
                    {isOwnerView ? 'Customer Orders' : 'Your Orders'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {isOwnerView
                        ? 'Manage order stages and keep customers updated.'
                        : 'Track current order stages and review order history.'}
                </Typography>
            </Stack>

            {orders.length > 0 ? (
                <OrdersPaper>
                    {orders.map((order) => (
                        <OrderItemDetails
                            key={order.id}
                            order={order}
                            isOwnerView={isOwnerView}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </OrdersPaper>
            ) : (
                <Box textAlign="center" color="text.secondary">
                    <ReceiptLongOutlinedIcon
                        sx={{ fontSize: theme.typography.pxToRem(60) }}
                    />
                    <Typography variant="h6">No orders found.</Typography>
                </Box>
            )}
        </StyledOrdersContainer>
    );
};
