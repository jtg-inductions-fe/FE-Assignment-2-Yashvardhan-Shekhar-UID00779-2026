import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionSummary,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';

import { Button } from '@components';

import { STAGES } from './OrderItemDetails.config';
import { StatusChip, StyledAccordionDetails } from './OrderItemDetails.styles';
import { OrderItemDetailsProps } from './OrderItemDetails.types';
import {
    getActiveStep,
    getStatus,
    getStatusColor,
} from './OrderItemDetails.util';

export const OrderItemDetails = ({
    order,
    isOwnerView,
    onStatusChange,
}: OrderItemDetailsProps) => {
    const activeStep =
        order.status === 'rejected' ? 0 : getActiveStep(order.status);
    const rejected = order.status === 'rejected' ? 1 : -1;
    const date = new Date(order.date).toDateString();

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
                        <StatusChip
                            label={getStatus(order.status)}
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
                    </Stack>
                </Stack>
            </AccordionSummary>

            <StyledAccordionDetails>
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
                                    onClick={() =>
                                        onStatusChange(order.id, 'rejected')
                                    }
                                >
                                    Reject Order
                                </Button>
                                <Button
                                    variant="outlined"
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
                                variant="outlined"
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
                                variant="outlined"
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
                                variant="outlined"
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
                    </Stack>
                )}
            </StyledAccordionDetails>
        </Accordion>
    );
};
