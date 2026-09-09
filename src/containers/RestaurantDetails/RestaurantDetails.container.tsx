import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { AccessTime, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Chip, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Button, DeleteDialog, Grid, MenuCard, Tooltip } from '@components';
import { MenuFormDialog, RestaurantFormDialog } from '@containers';
import {
    editRestaurantDetailsService,
    getRestaurantDetailsService,
    handleCreateMenuItem as createMenuItemService,
    handleDeleteMenuItem as deleteMenuItemService,
    handleEditMenuItem as editMenuItemService,
} from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { MenuItem, Restaurant } from '@types';
import { formatTime, startLoading } from '@utils';

export const RestaurantDetails = () => {
    const rid = useParams().restaurantId;

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const canShow = useMediaQuery(theme.breakpoints.up('md'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';
    const restaurantDetails = useAppSelector(
        (state) => state.restaurantDetails.restaurant,
    );

    const [isOpenRestaurantFormDialogOpen, setIsOpenRestaurantFormDialogOpen] =
        useState(false);
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

    /** setTarget menu to null removes restaurant*/
    const handleCloseMenuFormDialog = () => {
        if (!isProcessing) setTargetEditMenuItem(null);
    };

    /** closes dialog and removes menuItem */
    const handleCloseDeleteDialog = () => {
        if (!isProcessing) setTargetDeleteMenuItem(null);
    };

    /** closes dialog and edits restaurant details*/
    const handleCloseRestaurantFormDialog = () => {
        if (!isProcessing) setIsOpenRestaurantFormDialogOpen(false);
    };

    /**
     * changes the the restaurant details
     * @param data restaurant details
     */
    const handleEditRestaurant = async (data: Restaurant) => {
        setIsProcessing(true);
        await editRestaurantDetailsService(data, dispatch);
        setIsProcessing(false);
        setIsOpenRestaurantFormDialogOpen(false);
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

    /** deletes the target set menu from the store */
    const handleDeleteMenuItem = async () => {
        if (targetDeleteMenuItem) {
            setIsProcessing(true);
            await deleteMenuItemService(targetDeleteMenuItem, dispatch);
            setIsProcessing(false);
            setTargetDeleteMenuItem(null);
        }
    };

    /**sets restaurant form dialog state to open */
    const handleRestaurantFormDialogOpen = () => {
        setIsOpenRestaurantFormDialogOpen(true);
    };

    /** sets target menuItem for edit dialog */
    const handleTargetEditMenuItem = (menuItem: MenuItem) => {
        setTargetEditMenuItem(menuItem);
    };

    /** sets target menuItem for delete dialog */
    const handleTargetDeleteMenuItem = (menuItem: MenuItem) => {
        setTargetDeleteMenuItem(menuItem);
    };

    // Update Redux store on initial load
    useEffect(() => {
        startLoading(dispatch);
        void getRestaurantDetailsService(rid, dispatch);
    }, [dispatch, rid]);

    return (
        restaurantDetails && (
            <>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', md: 'center' }}
                    gap={2}
                    pb={4}
                >
                    <Box gap={1}>
                        <Typography variant="h2" component="h1">
                            {restaurantDetails?.name}
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            color="text.secondary"
                        >
                            <AccessTime fontSize="small" />
                            <Typography variant="subtitle1" ml={1} mr={4}>
                                {formatTime(restaurantDetails?.openingTime)} -{' '}
                                {formatTime(restaurantDetails?.closingTime)}
                            </Typography>
                            <Chip
                                label={
                                    restaurantDetails?.isVeg
                                        ? 'Pure Veg'
                                        : 'Non-Veg'
                                }
                                color={
                                    restaurantDetails?.isVeg
                                        ? 'success'
                                        : 'error'
                                }
                                size="small"
                            />
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            {restaurantDetails?.description}
                        </Typography>
                    </Box>
                    {isOwnerView && (
                        <Box display="flex" flexDirection="column" gap={2}>
                            <Tooltip
                                title="Edit Restaurant Details"
                                mustShow={!canShow}
                            >
                                <Button
                                    isAddButton={true}
                                    variant="outlined"
                                    size={canShow ? 'large' : 'small'}
                                    startIcon={<Edit />}
                                    aria-label="Add New Menu Item"
                                    onClick={handleRestaurantFormDialogOpen}
                                >
                                    {canShow && 'Edit Restaurant Details'}
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title="Add New Menu Item"
                                mustShow={!canShow}
                            >
                                <Button
                                    isAddButton={true}
                                    variant="outlined"
                                    size={canShow ? 'large' : 'small'}
                                    startIcon={<AddIcon />}
                                    aria-label="Add New Menu Item"
                                    onClick={() =>
                                        handleTargetEditMenuItem(
                                            initialMenuState,
                                        )
                                    }
                                >
                                    {canShow && 'Add New Menu Item'}
                                </Button>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
                <Grid>
                    {restaurantDetails?.menu.map((menuItem) => (
                        <MenuCard
                            key={menuItem.id}
                            item={menuItem}
                            isOwnerView={isOwnerView}
                            dispatch={dispatch}
                            onEdit={() => handleTargetEditMenuItem(menuItem)}
                            onDelete={() =>
                                handleTargetDeleteMenuItem(menuItem)
                            }
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
                <RestaurantFormDialog
                    restaurant={restaurantDetails}
                    isProcessing={isProcessing}
                    isOpen={isOpenRestaurantFormDialogOpen}
                    handleEditRestaurant={handleEditRestaurant}
                    handleClose={handleCloseRestaurantFormDialog}
                />
                <MenuFormDialog
                    menuItem={targetEditMenuItem || initialMenuState}
                    isOpen={!!targetEditMenuItem}
                    isProcessing={isProcessing}
                    onClose={handleCloseMenuFormDialog}
                    handleCreateMenuItem={handleCreateMenuItem}
                    handleEditMenuItem={handleEditMenuItem}
                />
                <DeleteDialog
                    name={targetDeleteMenuItem?.name}
                    isProcessing={isProcessing}
                    handleClose={handleCloseDeleteDialog}
                    handleConfirm={handleDeleteMenuItem}
                />
            </>
        )
    );
};
