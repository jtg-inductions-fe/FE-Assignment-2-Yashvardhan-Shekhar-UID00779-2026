import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Stack, Switch } from '@mui/material';

import { Button, Dialog, TextField } from '@components';
import { Restaurant } from '@types';

import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
    StyledFormControlLabel,
} from './RestaurantFormDialog.styles';

type RestaurantFormDialogProps = {
    restaurant: Restaurant;
    handleClose: () => void;
    isProcessing: boolean;
    isOpen: boolean;
    handleEditRestaurant: (data: Restaurant) => void;
    handleCreateRestaurant: (data: Restaurant) => void;
};

export const RestaurantFormDialog = ({
    restaurant,
    isProcessing,
    isOpen,
    handleClose,
    handleCreateRestaurant,
    handleEditRestaurant,
}: RestaurantFormDialogProps) => {
    const isEditMode = restaurant?.id !== '';

    const handleFormSubmit = (data: Restaurant) => {
        if (isEditMode) {
            handleEditRestaurant(data);
        } else {
            handleCreateRestaurant(data);
        }
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<Restaurant>({
        defaultValues: restaurant,
    });

    useEffect(() => {
        reset(restaurant);
    }, [isOpen, reset, restaurant]);

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <StyledDialogTitle variant="h5">
                {isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}
            </StyledDialogTitle>

            <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
                <StyledDialogContent dividers>
                    <Stack spacing={2.5}>
                        <TextField
                            {...register('name', {
                                required: 'Restaurant name is required',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Name must be at least 2 characters',
                                },
                            })}
                            label="Restaurant Name"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            {...register('description', {
                                minLength: {
                                    value: 10,
                                    message:
                                        'Description must be at least 10 characters',
                                },
                            })}
                            label="Description"
                            multiline
                            rows={3}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                        >
                            <TextField
                                {...register('openingTime')}
                                label="Opening Time"
                                type="time"
                                fullWidth
                            />

                            <TextField
                                {...register('closingTime')}
                                label="Closing Time"
                                type="time"
                                fullWidth
                            />
                        </Stack>

                        <TextField
                            {...register('image')}
                            label="Image URL"
                            placeholder="https://example.com/image.jpg"
                        />

                        <Controller
                            name="isVeg"
                            control={control}
                            render={({ field }) => (
                                <StyledFormControlLabel
                                    sx={{ width: 'fit-content' }}
                                    control={
                                        <Switch
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                            color="success"
                                        />
                                    }
                                    label="Pure Vegetarian Restaurant"
                                />
                            )}
                        />
                    </Stack>
                </StyledDialogContent>

                <StyledDialogActions>
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
                </StyledDialogActions>
            </form>
        </Dialog>
    );
};
