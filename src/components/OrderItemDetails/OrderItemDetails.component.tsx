import { Fragment } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';

import { Button } from '@components';
import { Order, OrderStatus } from '@types';

import {
    ActionControlsStack,
    ItemRow,
    StatusChip,
    StyledAccordion,
    StyledAccordionDetails,
    StyledAccordionSummary,
    StyledDivider,
} from './OrderItemDetails.styles';

type OrderItemDetailsProps = {
    order: Order;
    isOwnerView: boolean;
    onStatusChange: (orderId: string, nextStatus: OrderStatus) => void;
};

const STAGES: { label: string; value: OrderStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Preparing', value: 'preparing' },
    { label: 'Out for Delivery', value: 'out_for_delivery' },
    { label: 'Delivered', value: 'delivered' },
];

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'accepted':
        case 'preparing':
            return 'info';
        case 'out_for_delivery':
            return 'secondary';
        case 'delivered':
            return 'success';
        case 'rejected':
            return 'error';
        default:
            return 'default';
    }
};

const getActiveStep = (status: OrderStatus) =>
    STAGES.findIndex((s) => s.value === status);

export const OrderItemDetails = ({
    order,
    isOwnerView,
    onStatusChange,
}: OrderItemDetailsProps) => {
    const activeStep = getActiveStep(order.status);

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ItemRow
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ width: '100%' }}
                >
                    <div>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Order #{order.id}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {order.date}
                        </Typography>
                    </div>

                    <ItemRow direction="row" alignItems="center" spacing={2}>
                        <StatusChip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                            variant="outlined"
                        />
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="primary.main"
                        >
                            ₹{order.totalAmount.toFixed(2)}
                        </Typography>
                    </ItemRow>
                </ItemRow>
            </StyledAccordionSummary>

            <StyledAccordionDetails>
                <Typography variant="subtitle2" fontWeight="bold">
                    Order Items
                </Typography>

                {order.items.map((item, idx) => (
                    <Fragment key={item.id}>
                        <ItemRow
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="body2">
                                {item.name} <strong>x {item.quantity}</strong>
                            </Typography>
                            <Typography variant="body2" fontWeight="500">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        </ItemRow>
                        {idx < order.items.length - 1 && (
                            <StyledDivider sx={{ my: 0.5 }} />
                        )}
                    </Fragment>
                ))}

                <StyledDivider />

                {!isOwnerView && (
                    <>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{ mb: 2 }}
                        >
                            Order Tracking
                        </Typography>
                        {order.status === 'rejected' ? (
                            <StatusChip
                                label="This order was rejected"
                                color="error"
                            />
                        ) : (
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {STAGES.map((stage) => (
                                    <Step key={stage.value}>
                                        <StepLabel>{stage.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        )}
                    </>
                )}

                {isOwnerView && (
                    <ActionControlsStack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        {order.status === 'pending' && (
                            <>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                        onStatusChange(order.id, 'rejected')
                                    }
                                >
                                    Reject Order
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        onStatusChange(order.id, 'accepted')
                                    }
                                >
                                    Accept Order
                                </Button>
                            </>
                        )}

                        {order.status === 'accepted' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    onStatusChange(order.id, 'preparing')
                                }
                            >
                                Start Preparing
                            </Button>
                        )}

                        {order.status === 'preparing' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    onStatusChange(order.id, 'out_for_delivery')
                                }
                            >
                                Mark Out for Delivery
                            </Button>
                        )}

                        {order.status === 'out_for_delivery' && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() =>
                                    onStatusChange(order.id, 'delivered')
                                }
                            >
                                Mark Delivered
                            </Button>
                        )}

                        {(order.status === 'delivered' ||
                            order.status === 'rejected') && (
                            <Typography variant="body2" color="text.secondary">
                                No further actions available.
                            </Typography>
                        )}
                    </ActionControlsStack>
                )}
            </StyledAccordionDetails>
        </StyledAccordion>
    );
};
