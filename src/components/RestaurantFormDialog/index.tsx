import { Controller, useForm } from 'react-hook-form';

import {
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Stack,
    Switch,
} from '@mui/material';

import { StyledButton, StyledDialog, StyledField } from '@styles';
import { Restaurant } from '@types';

type RestaurantFormDialogProps = {
    onClose: () => void;
    isProcessing: boolean;
    onEditRestaurant: (data: Restaurant) => Promise<void>;
    onCreateRestaurant: (data: Restaurant) => Promise<void>;
    restaurant: Restaurant;
};

export const RestaurantFormDialog = ({
    onClose,
    restaurant,
    isProcessing,
    onEditRestaurant,
    onCreateRestaurant,
}: RestaurantFormDialogProps) => {
    const isEditMode = restaurant.id !== '';

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Restaurant>({
        defaultValues: restaurant,
    });

    const handleFormSubmit = async (data: Restaurant) => {
        if (isEditMode) {
            await onEditRestaurant(data);
        } else {
            await onCreateRestaurant(data);
        }
    };

    return (
        <StyledDialog open={true} onClose={onClose} fullWidth>
            <DialogTitle variant="h5" sx={{ fontWeight: 'bold' }}>
                {isEditMode ? 'Edit Restaurant' : 'Add New Restaurant'}
            </DialogTitle>

            <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
                <DialogContent
                    dividers
                    sx={{ paddingInline: { xs: 0.5, sm: 2 } }}
                >
                    <Stack spacing={2.5}>
                        <StyledField
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

                        <StyledField
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
                            <StyledField
                                {...register('openingTime')}
                                label="Opening Time"
                                type="time"
                                fullWidth
                            />

                            <StyledField
                                {...register('closingTime')}
                                label="Closing Time"
                                type="time"
                                fullWidth
                            />
                        </Stack>

                        <StyledField
                            {...register('image')}
                            label="Image URL"
                            placeholder="https://example.com/image.jpg"
                        />

                        <Controller
                            name="isVeg"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={field.value}
                                            onChange={(event) =>
                                                field.onChange(
                                                    event.target.checked,
                                                )
                                            }
                                            color="success"
                                        />
                                    }
                                    label="Pure Vegetarian Restaurant"
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions
                    sx={{
                        p: (theme) => theme.typography.pxToRem(16),
                        gap: 1,
                    }}
                >
                    <StyledButton
                        onClick={onClose}
                        color="inherit"
                        disabled={isProcessing}
                    >
                        Cancel
                    </StyledButton>

                    <StyledButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={isProcessing}
                        loadingPosition="end"
                    >
                        {isEditMode ? 'Save Changes' : 'Add Restaurant'}
                    </StyledButton>
                </DialogActions>
            </form>
        </StyledDialog>
    );
};
