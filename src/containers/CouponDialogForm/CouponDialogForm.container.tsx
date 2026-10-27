import { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Box, DialogContent } from '@mui/material';

import { Dialog, RadioField, TextField } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCouponService, editCouponService } from '@services';
import { useAppDispatch } from '@store';
import { Coupon } from '@types';
import { delay } from '@utils';

import { CouponSchema } from './CouponDialogForm.config';
import { CouponDialogFormProps, CouponReq } from './CouponDialogForm.types';

export const CouponDialogForm = (props: CouponDialogFormProps) => {
    const { coupon, restaurantId, isOpen, handleClose } = props;

    const isEditMode = !!coupon.id;
    const dispatch = useAppDispatch();
    const [isProcessing, setIsProcessing] = useState(false);

    const { is_active: isActive, ...rest } = coupon;

    const defaultValues = {
        ...rest,
        state: isActive ? 'Active' : 'Inactive',
    };

    const methods = useForm<CouponReq>({
        resolver: zodResolver(CouponSchema),
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset } = methods;

    const handleFormSubmit = async (data: CouponReq) => {
        setIsProcessing(true);

        const { state, ...restData } = data;

        const couponData: Coupon = {
            ...restData,
            is_active: state === 'Active',
        };

        if (isEditMode)
            await editCouponService(restaurantId, couponData, dispatch);
        else await createCouponService(restaurantId, couponData, dispatch);

        await delay(2000);
        setIsProcessing(false);
    };

    const handleCloneClick = () => {
        if (isProcessing) return;
        handleClose();
    };

    useEffect(() => {
        reset(coupon);
    }, [isOpen, reset, coupon]);

    return (
        <FormProvider {...methods}>
            <Dialog
                isOpen={isOpen}
                title={isEditMode ? 'Edit Coupon' : 'Add New Coupon'}
                onClose={handleCloneClick}
                form={{
                    isProcessing: isProcessing,
                    onSubmit: (e) => void handleSubmit(handleFormSubmit)(e),
                    submitText: isEditMode ? 'Save Coupon' : 'Create Coupon' ,
                    color: 'primary',
                }}
            >
                <DialogContent dividers sx={{ px: { xs: 0.5, sm: 2 } }}>
                    <Box display="flex" flexDirection="column" gap={2.5}>
                        <TextField field="code" label="Coupon Code *" />
                        <TextField
                            field="percentage"
                            label="percentage"
                            type="number"
                            fullWidth
                        />
                        <RadioField
                            fieldName="state"
                            heading="Coupon state"
                            options={['Active', 'Inactive']}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
};
