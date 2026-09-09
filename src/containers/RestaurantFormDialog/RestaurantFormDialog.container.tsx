import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Box, DialogContent } from '@mui/material';

import { Dialog, RadioField, TextField } from '@components';

import {
    RestaurantFormDialogProps,
    RestaurantInput,
} from './RestaurantFormDialog.types';

export const RestaurantFormDialog = (props: RestaurantFormDialogProps) => {
    const {
        restaurant,
        isProcessing,
        isOpen,
        handleClose,
        handleCreateRestaurant,
        handleEditRestaurant,
    } = props;

    const methods = useForm<RestaurantInput>();

    const { register, handleSubmit, reset } = methods;

    const isEditMode = restaurant?.id !== '';

    /**
     * handles submit based on the edit mode
     * @param data - restaurant details
     */
    const handleFormSubmit = async (data: RestaurantInput) => {
        const newRestaurant = {
            ...data,
            isVeg: data?.isVeg === 'veg',
        };
        if (!isEditMode && handleCreateRestaurant) {
            await handleCreateRestaurant(newRestaurant);
        } else {
            await handleEditRestaurant(newRestaurant);
        }
    };

    useEffect(() => {
        reset({ ...restaurant, isVeg: restaurant.isVeg ? 'veg' : 'non-veg' });
    }, [reset, restaurant]);

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <Dialog
                    isOpen={isOpen}
                    onClose={handleClose}
                    title={
                        isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'
                    }
                    submitText={isEditMode ? 'Save Changes' : 'Add Restaurant'}
                    isProcessing={isProcessing}
                    onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
                >
                    <DialogContent dividers sx={{ px: { xs: 0.5, sm: 2 } }}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                field="name"
                                label="Restaurant Name *"
                                {...register('name', {
                                    required: 'Restaurant name is required',
                                })}
                            />
                            <TextField
                                field="description"
                                label="Description"
                                multiline
                                rows={3}
                            />
                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', sm: 'row' }}
                                gap={2}
                            >
                                <TextField
                                    field="openingTime"
                                    label="Opening Time"
                                    type="time"
                                    fullWidth
                                />
                                <TextField
                                    field="closingTime"
                                    label="Closing Time"
                                    type="time"
                                    fullWidth
                                />
                            </Box>
                            <TextField
                                field="image"
                                label="Image URL"
                                placeholder="https://example.com/image.jpg"
                            />
                            <RadioField
                                fieldName="isVeg"
                                heading="Select Category"
                                options={['veg', 'non-veg']}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </FormProvider>
    );
};
