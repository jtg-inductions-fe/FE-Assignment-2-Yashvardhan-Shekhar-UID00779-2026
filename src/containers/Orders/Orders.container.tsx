import { useState } from 'react';

import { useLoaderData } from 'react-router';

import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Typography } from '@mui/material';

import { OrderItemDetails } from '@components';
import { useAppSelector } from '@store';
import { Order, OrderStatus } from '@types';

import {
    EmptyStateBox,
    HeaderStack,
    OrdersPaper,
    StyledOrdersContainer,
} from './Orders.styles';

export const Orders = () => {
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
            <HeaderStack spacing={1}>
                <Typography variant="h4" component="h1" fontWeight={800}>
                    {isOwnerView ? 'Customer Orders' : 'Your Orders'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {isOwnerView
                        ? 'Manage order stages and keep customers updated.'
                        : 'Track current order stages and review order history.'}
                </Typography>
            </HeaderStack>

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
                <EmptyStateBox>
                    <ReceiptLongOutlinedIcon
                        sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
                    />
                    <Typography variant="h6" color="text.secondary">
                        No orders found.
                    </Typography>
                </EmptyStateBox>
            )}
        </StyledOrdersContainer>
    );
};
