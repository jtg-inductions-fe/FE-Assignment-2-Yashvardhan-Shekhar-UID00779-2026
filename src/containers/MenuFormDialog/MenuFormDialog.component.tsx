import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Box, DialogTitle, Stack } from '@mui/material';

import { Button, Dialog, TextField } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@types';

import { MenuItemSchema } from './MenuFormDialog.config';
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
        resolver: zodResolver(MenuItemSchema),
        defaultValues: menuItem,
    });
    const { handleSubmit, reset } = methods;

    /**
     * add/edit the menu with the data of menuItem
     * @param data menuItem data
     */
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
                <DialogTitle variant="h4" component="h1">
                    {isEditMode ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
                <Box
                    component="form"
                    onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
                >
                    <StyledDialogContent>
                        <Stack spacing={2.5}>
                            <TextField field="name" label="Item Name *" />
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
                            variant="outlined"
                            disabled={isProcessing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            loading={isProcessing}
                        >
                            {isEditMode ? 'Save Changes' : 'Add Item'}
                        </Button>
                    </StyledDialogActions>
                </Box>
            </Dialog>
        </FormProvider>
    );
};
