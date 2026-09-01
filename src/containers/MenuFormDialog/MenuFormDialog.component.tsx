import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { DialogTitle, Stack } from '@mui/material';

import { Button, Dialog, TextField } from '@components';
import { MenuItem } from '@types';

import {
    StyledDialogActions,
    StyledDialogContent,
} from './MenuFormDialog.styles';
import { MenuFormDialogProps } from './MenuFormDialog.types';

export const MenuFormDialog = ({
    menuItem,
    isProcessing,
    isOpen,
    onClose,
    handleCreateMenuItem,
    handleEditMenuItem,
}: MenuFormDialogProps) => {
    const isEditMode = menuItem.id !== '';

    const methods = useForm<MenuItem>({
        defaultValues: menuItem,
    });
    const { register, handleSubmit, reset } = methods;

    const handleFormSubmit = async (data: MenuItem) => {
        if (isEditMode) {
            await handleEditMenuItem(data);
        } else {
            await handleCreateMenuItem(data);
        }
    };

    useEffect(() => {
        reset(menuItem);
    }, [isOpen, reset, menuItem]);

    return (
        <FormProvider {...methods}>
            <Dialog open={isOpen} onClose={onClose} fullWidth>
                <DialogTitle variant="h3" component="h1">
                    {isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>

                <form onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}>
                    <StyledDialogContent dividers>
                        <Stack spacing={2.5}>
                            <TextField
                                field="name"
                                {...register('name', {
                                    required: 'Item name is required',
                                })}
                                label="Item Name"
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
                                    field="price"
                                    label="Price"
                                    type="number"
                                    fullWidth
                                />

                                <TextField
                                    field="stock"
                                    label="Stock Quantity"
                                    type="number"
                                    fullWidth
                                />
                            </Stack>

                            <TextField
                                field="image"
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
        </FormProvider>
    );
};
