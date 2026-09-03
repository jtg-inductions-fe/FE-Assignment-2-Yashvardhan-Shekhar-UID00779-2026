import { useState } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useTheme,
} from '@mui/material';

import { Button } from '@components';
import { updateOrder } from '@services';
import { useAppDispatch } from '@store';
import { OrderStatus } from '@types';

import { STAGES } from './OrderItemDetails.config';
import { OrderItemDetailsProps } from './OrderItemDetails.types';
import {
    getActiveStep,
    getStatus,
    getStatusColor,
    getStatusIcon,
    // getStatusIcon,
} from './OrderItemDetails.util';

/** returns the icon for the given order status */

export const OrderItemDetails = (props: OrderItemDetailsProps) => {
    const { order, isOwnerView } = props;

    const dispatch = useAppDispatch();
    const theme = useTheme();

    const [isLoading, setIsLoading] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const activeStep =
        order.status === 'rejected' ? 0 : getActiveStep(order.status);
    const rejected = order.status === 'rejected' ? 1 : -1;
    const date = new Date(order.date).toDateString();
    const StatusIcon = getStatusIcon(order.status);

    /**
     * status change of the order
     * @param orderId id of the order
     * @param nextStatus next status
     */
    const handleStatusChange = async (
        orderId: string,
        nextStatus: OrderStatus,
    ) => {
        if (nextStatus === 'rejected') {
            setIsRejecting(true);
        } else {
            setIsLoading(true);
        }
        await updateOrder(orderId, nextStatus, dispatch);
        if (nextStatus === 'rejected') {
            setIsRejecting(false);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <Accordion sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ p: 3 }}>
                <Stack
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
                            {date}
                        </Typography>
                    </div>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Chip
                            label={getStatus(order.status)}
                            color={getStatusColor(order.status)}
                            size="small"
                            variant="outlined"
                            icon={<StatusIcon fontSize="small" />}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                pl: 1,
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="primary.main"
                        >
                            ₹{order.totalAmount.toFixed(2)}
                        </Typography>
                    </Stack>
                </Stack>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: theme.spacing(3),
                    backgroundColor: theme.palette.action.hover,
                }}
            >
                {order.items.map((item) => (
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        key={item.id}
                    >
                        <Typography variant="body2">
                            {item.name} x {item.quantity}
                        </Typography>
                        <Typography variant="body2" fontWeight="500">
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Stack>
                ))}
                {!isOwnerView && (
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{ pt: 6 }}
                    >
                        {STAGES.map((stage, index) => (
                            <Step key={stage.value}>
                                {rejected == index ? (
                                    <StepLabel error>Rejected</StepLabel>
                                ) : (
                                    <StepLabel>{stage.label}</StepLabel>
                                )}
                            </Step>
                        ))}
                    </Stepper>
                )}
                {isOwnerView && (
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                        mt={6}
                    >
                        {order.status === 'pending' && (
                            <>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    loading={isRejecting}
                                    loadingPosition="end"
                                    disabled={isLoading}
                                    onClick={() =>
                                        void handleStatusChange(
                                            order.id,
                                            'rejected',
                                        )
                                    }
                                >
                                    Reject Order
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    loading={isLoading}
                                    loadingPosition="end"
                                    disabled={isRejecting}
                                    onClick={() =>
                                        void handleStatusChange(
                                            order.id,
                                            'accepted',
                                        )
                                    }
                                >
                                    Accept Order
                                </Button>
                            </>
                        )}
                        {order.status === 'accepted' && (
                            <Button
                                variant="outlined"
                                color="primary"
                                loading={isLoading}
                                loadingPosition="end"
                                onClick={() =>
                                    void handleStatusChange(
                                        order.id,
                                        'preparing',
                                    )
                                }
                            >
                                Start Preparing
                            </Button>
                        )}
                        {order.status === 'preparing' && (
                            <Button
                                variant="outlined"
                                color="primary"
                                loading={isLoading}
                                loadingPosition="end"
                                onClick={() =>
                                    void handleStatusChange(
                                        order.id,
                                        'out_for_delivery',
                                    )
                                }
                            >
                                Mark Out for Delivery
                            </Button>
                        )}
                        {order.status === 'out_for_delivery' && (
                            <Button
                                variant="outlined"
                                color="success"
                                loading={isLoading}
                                loadingPosition="end"
                                onClick={() =>
                                    void handleStatusChange(
                                        order.id,
                                        'delivered',
                                    )
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
                    </Stack>
                )}
            </AccordionDetails>
        </Accordion>
    );
};
