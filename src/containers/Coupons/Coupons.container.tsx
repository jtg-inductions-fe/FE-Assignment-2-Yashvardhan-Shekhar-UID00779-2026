import { useEffect, useState } from 'react';

import { Edit } from '@mui/icons-material';
import {
    Chip,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';

import { Dialog } from '@components';
import { getCoupons } from '@services';
import { useAppDispatch } from '@store';
import { Coupon } from '@types';
import { startLoading } from '@utils';

import { CouponDialogProps } from './Coupons.types';

export const CouponsDialog = (props: CouponDialogProps) => {
    const { isOpen, handleClose, restaurantId, openEditMenuOfCoupon } = props;

    const dispatch = useAppDispatch();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        if (!isOpen || !restaurantId) {
            return;
        }

        startLoading(dispatch);
        void getCoupons(restaurantId, dispatch).then((data) => {
            if (data) {
                setCoupons(data);
            }
        });
    }, [isOpen, restaurantId, dispatch]);
    return (
        <Dialog isOpen={isOpen} title="All Coupons" onClose={handleClose}>
            <List
                sx={{
                    width: '100%',
                    px: 2,
                    maxHeight: 400,
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                }}
            >
                Coupon
                {coupons.map((coupon) => (
                    <ListItem
                        key={coupon.id}
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            py: 2,
                        }}
                        secondaryAction={
                            <IconButton
                                aria-label={`Edit coupon ${coupon.code}`}
                                edge="end"
                                onClick={() => openEditMenuOfCoupon(coupon)}
                            >
                                <Edit />
                            </IconButton>
                        }
                    >
                        <ListItemText
                            primary={
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {coupon.code.toUpperCase()}
                                </Typography>
                            }
                            secondary={
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mt: 0.75 }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {coupon.percentage}% discount
                                    </Typography>

                                    <Chip
                                        label={
                                            coupon.is_active
                                                ? 'Active'
                                                : 'Inactive'
                                        }
                                        color={
                                            coupon.is_active
                                                ? 'success'
                                                : 'default'
                                        }
                                        size="small"
                                        variant="outlined"
                                    />
                                </Stack>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};
