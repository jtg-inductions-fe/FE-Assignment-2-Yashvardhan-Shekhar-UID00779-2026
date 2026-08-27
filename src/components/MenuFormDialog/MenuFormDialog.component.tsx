import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { Button, Dialog, TextField } from '@components';
import { MenuItem } from '@types';

import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from './MenuFormDialog.styles';

type MenuFormDialogProps = {
    menuItem: MenuItem;
    isProcessing: boolean;
    isOpen: boolean;
    onClose: () => void;
    handleEditMenuItem: (data: MenuItem) => void;
    handleCreateMenuItem: (data: MenuItem) => void;
};

export const MenuFormDialog = ({
    menuItem,
    isProcessing,
    isOpen,
    onClose,
    handleCreateMenuItem,
    handleEditMenuItem,
}: MenuFormDialogProps) => {
    const isEditMode = menuItem.id !== '';

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MenuItem>({
        defaultValues: menuItem,
    });

    const handleFormSubmit = (data: MenuItem) => {
        if (isEditMode) {
            handleEditMenuItem(data);
        } else {
            handleCreateMenuItem(data);
        }
    };

    useEffect(() => {
        reset(menuItem);
    }, [isOpen, reset, menuItem]);

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <StyledDialogTitle variant="h5">
                {isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}
            </StyledDialogTitle>

            <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
                <StyledDialogContent dividers>
                    <Stack spacing={2.5}>
                        <TextField
                            {...register('name', {
                                required: 'Item name is required',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Name must be at least 2 characters',
                                },
                            })}
                            label="Item Name"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            {...register('description', {
                                minLength: {
                                    value: 5,
                                    message:
                                        'Description must be at least 5 characters',
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
                                {...register('price', {
                                    required: 'Price is required',
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: 'Price cannot be negative',
                                    },
                                    max: {
                                        value: 10000,
                                        message:
                                            'Price cannot be more than 1000',
                                    },
                                })}
                                label="Price"
                                type="number"
                                fullWidth
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />

                            <TextField
                                {...register('stock', {
                                    required: 'Stock is required',
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: 'Stock cannot be negative',
                                    },
                                })}
                                label="Stock Quantity"
                                type="number"
                                fullWidth
                                error={!!errors.stock}
                                helperText={errors.stock?.message}
                            />
                        </Stack>

                        <TextField
                            {...register('image')}
                            label="Image URL"
                            placeholder="https://example.com/item.jpg"
                        />
                    </Stack>
                </StyledDialogContent>

                <StyledDialogActions>
                    <Button
                        onClick={onClose}
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
                        {isEditMode ? 'Save Changes' : 'Add Item'}
                    </Button>
                </StyledDialogActions>
            </form>
        </Dialog>
    );
};
