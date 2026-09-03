import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Container,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { AddButton, DeleteDialog, Grid, MenuCard } from '@components';
import { MenuFormDialog } from '@containers';
import {
    getRestaurantDetailsService,
    handleCreateMenuItem as createMenuItemService,
    handleDeleteMenuItem as deleteMenuItemService,
    handleEditMenuItem as editMenuItemService,
} from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { MenuItem } from '@types';

export const RestaurantDetails = () => {
    const rid = useParams().restaurantId;

    const dispatch = useAppDispatch();

    const theme = useTheme();
    const canShow = useMediaQuery(theme.breakpoints.up('sm'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    // Get initial data from loader
    const restaurantDetails = useAppSelector(
        (state) => state.restaurantDetails.restaurant,
    );

    const [isProcessing, setIsProcessing] = useState(false);
    const [targetDeleteMenuItem, setTargetDeleteMenuItem] =
        useState<MenuItem | null>(null);
    const [targetEditMenuItem, setTargetEditMenuItem] =
        useState<MenuItem | null>(null);

    const initialMenuState = {
        id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
    };

    /**
     * setTarget menu to null removes restaurant
     */
    const handleCloseFormDialog = () => {
        if (!isProcessing) setTargetEditMenuItem(null);
    };

    /**
     * closes dialog and removes restaurant
     */
    const handleCloseDeleteDialog = () => {
        if (!isProcessing) setTargetDeleteMenuItem(null);
    };

    /**
     * updates menu for the new item
     * @param data menuItem to add in the menu
     */
    const handleCreateMenuItem = async (data: MenuItem) => {
        setIsProcessing(true);
        await createMenuItemService(data, dispatch);
        setIsProcessing(false);
        setTargetEditMenuItem(null);
    };

    /**
     * updates menu in the menu item
     * @param data data of edited menuItem
     */
    const handleEditMenuItem = async (data: MenuItem) => {
        if (targetEditMenuItem) {
            setIsProcessing(true);
            await editMenuItemService(data, dispatch);
            setIsProcessing(false);
            setTargetEditMenuItem(null);
        }
    };

    /**
     * deletes the target set menu from the store
     */
    const handleDeleteMenuItem = async () => {
        if (targetDeleteMenuItem) {
            setIsProcessing(true);
            await deleteMenuItemService(targetDeleteMenuItem, dispatch);
            setIsProcessing(false);
            setTargetDeleteMenuItem(null);
        }
    };

    // Update Redux store on initial load
    useEffect(() => {
        void getRestaurantDetailsService(rid, dispatch);
    }, [dispatch, rid]);

    return (
        <Container maxWidth="xl">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                spacing={2}
                pb={4}
            >
                <Stack py={3}>
                    <Typography variant="h2" component="h1" fontWeight="bold">
                        {restaurantDetails?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {restaurantDetails?.description}
                    </Typography>
                </Stack>
                {isOwnerView && (
                    <AddButton
                        variant="outlined"
                        size={canShow ? 'large' : 'small'}
                        startIcon={<AddIcon />}
                        aria-label="Add New Menu Item"
                        onClick={() => setTargetEditMenuItem(initialMenuState)}
                    >
                        {canShow && 'Add New Menu Item'}
                    </AddButton>
                )}
            </Stack>
            <Grid>
                {restaurantDetails?.menu.map((menuItem) => (
                    <MenuCard
                        key={menuItem.id}
                        item={menuItem}
                        isOwnerView={isOwnerView}
                        dispatch={dispatch}
                        onEdit={() => setTargetEditMenuItem(menuItem)}
                        onDelete={() => setTargetDeleteMenuItem(menuItem)}
                    />
                ))}
            </Grid>
            {restaurantDetails?.menu.length === 0 && (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" color="text.secondary">
                        No menu items available.
                    </Typography>
                </Box>
            )}
            <MenuFormDialog
                menuItem={targetEditMenuItem || initialMenuState}
                isOpen={!!targetEditMenuItem}
                isProcessing={isProcessing}
                onClose={handleCloseFormDialog}
                handleCreateMenuItem={handleCreateMenuItem}
                handleEditMenuItem={handleEditMenuItem}
            />
            <DeleteDialog
                name={targetDeleteMenuItem?.name}
                isProcessing={isProcessing}
                handleClose={handleCloseDeleteDialog}
                handleConfirm={handleDeleteMenuItem}
            />
        </Container>
    );
};
