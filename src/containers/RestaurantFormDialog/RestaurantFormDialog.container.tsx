import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import {
    Box,
    DialogActions,
    DialogTitle,
    Stack,
    useTheme,
} from '@mui/material';

import { Button, Dialog, RadioField, TextField } from '@components';

import { StyledDialogContent } from './RestaurantFormDialog.styles';
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

    const theme = useTheme();

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
        if (isEditMode) {
            await handleEditRestaurant(newRestaurant);
        } else {
            await handleCreateRestaurant(newRestaurant);
        }
    };

    useEffect(() => {
        reset({ ...restaurant, isVeg: restaurant.isVeg ? 'veg' : 'non-veg' });
    }, [isOpen, reset, restaurant]);

    return (
        <FormProvider {...methods}>
            <Dialog open={isOpen} onClose={handleClose} fullWidth>
                <DialogTitle variant="h3" component="h1">
                    {isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}
                </DialogTitle>
                <Box
                    component="form"
                    onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
                >
                    <StyledDialogContent dividers>
                        <Stack spacing={2.5}>
                            <TextField
                                field="name"
                                label="Restaurant Name"
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
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
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
                            </Stack>
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
                        </Stack>
                    </StyledDialogContent>
                    <DialogActions
                        sx={{
                            padding: theme.typography.pxToRem(16),
                            gap: theme.spacing(1),
                        }}
                    >
                        <Button
                            onClick={handleClose}
                            color="inherit"
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isProcessing}
                            loadingPosition="end"
                        >
                            {isEditMode ? 'Save Changes' : 'Add Restaurant'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </FormProvider>
    );
};
