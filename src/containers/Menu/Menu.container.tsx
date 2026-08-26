import { useEffect, useState } from 'react';

import { useLoaderData } from 'react-router';

import AddIcon from '@mui/icons-material/Add';
import { Typography, useMediaQuery, useTheme } from '@mui/material';

import { DeleteDialog, MenuCard, MenuFormDialog } from '@components';
import {
    handleCreateMenuItem as handleCreateMenuItemService,
    handleDeleteMenuItem as handleDeleteMenuItemService,
    handleEditMenuItem as handleEditMenuItemService,
} from '@services';
import { setMenuItems, useAppDispatch, useAppSelector } from '@store';
import { MenuItem, RestaurantDetails } from '@types';

import {
    EmptyStateBox,
    HeaderStack,
    MenuGrid,
    StyledAddButton,
    StyledStack,
} from './Menu.styles';

export const Menu = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const canShow = useMediaQuery(theme.breakpoints.up('sm'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    // Get initial data from loader
    const restaurantDetails: RestaurantDetails = useLoaderData();

    // Read menu items directly from Redux store
    const menuItems = useAppSelector((state) => state.menu.menuItems);

    // Update Redux store on initial load
    useEffect(() => {
        if (restaurantDetails?.menu) {
            dispatch(setMenuItems(restaurantDetails.menu));
        }
    }, [restaurantDetails, dispatch]);

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

    const handleCreateMenuItem = (data: MenuItem) => {
        setIsProcessing(true);
        handleCreateMenuItemService(data, dispatch);
        setIsProcessing(false);
        setTargetEditMenuItem(null);
    };

    const handleEditMenuItem = (data: MenuItem) => {
        if (targetEditMenuItem) {
            setIsProcessing(true);
            handleEditMenuItemService(data, dispatch);
            setIsProcessing(false);
            setTargetEditMenuItem(null);
        }
    };

    const handleDeleteMenuItem = () => {
        if (targetDeleteMenuItem) {
            setIsProcessing(true);
            handleDeleteMenuItemService(targetDeleteMenuItem, dispatch);
            setIsProcessing(false);
            setTargetDeleteMenuItem(null);
        }
    };

    return (
        <>
            <HeaderStack
                direction="row"
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                spacing={2}
            >
                <StyledStack>
                    <Typography variant="h1" component="h1">
                        {restaurantDetails.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {restaurantDetails.description}
                    </Typography>
                </StyledStack>

                {isOwnerView && (
                    <StyledAddButton
                        variant="outlined"
                        size={canShow ? 'large' : 'small'}
                        startIcon={<AddIcon />}
                        aria-label="Add New Menu Item"
                        onClick={() => setTargetEditMenuItem(initialMenuState)}
                    >
                        {canShow && 'Add New Menu Item'}
                    </StyledAddButton>
                )}
            </HeaderStack>

            <MenuGrid>
                {menuItems.map((menuItem) => (
                    <MenuCard
                        key={menuItem.id}
                        item={menuItem}
                        isOwnerView={isOwnerView}
                        dispatch={dispatch}
                        onEdit={() => setTargetEditMenuItem(menuItem)}
                        onDelete={() => setTargetDeleteMenuItem(menuItem)}
                    />
                ))}

                {menuItems.length === 0 && (
                    <EmptyStateBox>
                        <Typography variant="h6" color="text.secondary">
                            No matching restaurants found.
                        </Typography>
                    </EmptyStateBox>
                )}
            </MenuGrid>

            {targetEditMenuItem && (
                <MenuFormDialog
                    menuItem={targetEditMenuItem || initialMenuState}
                    onClose={() => {
                        if (!isProcessing) setTargetEditMenuItem(null);
                    }}
                    isProcessing={isProcessing}
                    handleCreateMenuItem={handleCreateMenuItem}
                    handleEditMenuItem={handleEditMenuItem}
                />
            )}

            <DeleteDialog
                name={targetDeleteMenuItem?.name}
                isProcessing={isProcessing}
                onClose={() => {
                    if (!isProcessing) setTargetDeleteMenuItem(null);
                }}
                onConfirm={() => void handleDeleteMenuItem()}
            />
        </>
    );
};
