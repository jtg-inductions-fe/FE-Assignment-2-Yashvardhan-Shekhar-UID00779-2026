import { useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from 'store/store.type';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    InputAdornment,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import {
    DeleteDialog,
    RestaurantCard,
    RestaurantFormDialog,
} from '@components';
import {
    createRestaurantService,
    deleteRestaurantService,
    editRestaurantService,
    getRestaurantsService,
} from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { Restaurant } from '@types';

import {
    EmptyStateBox,
    FilterStack,
    HeaderStack,
    RestaurantGrid,
    SearchFieldContainer,
    StyledAddButton,
    StyledContainer,
    StyledField,
    StyledToggleButton,
} from './Restaurants.styles';

export const Restaurants = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const canShow = useMediaQuery(theme.breakpoints.up('sm'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    const restaurants = useSelector(
        (state: RootState) => state.restaurant.restaurants,
    );

    const [searchQuery, setSearchQuery] = useState('');
    const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>(
        'all',
    );

    const [isProcessing, setIsProcessing] = useState(false);
    const [targetDeleteRestaurant, setTargetDeleteRestaurant] =
        useState<Restaurant | null>(null);
    const [targetEditRestaurant, setTargetEditRestaurant] =
        useState<Restaurant | null>(null);

    const initialRestaurantState: Restaurant = {
        id: '',
        name: '',
        description: '',
        openingTime: '09:00',
        closingTime: '22:00',
        isVeg: false,
        image: '',
        owner: '',
    };

    /**
     * resets the target restaurants of form dialog
     * @return nothing
     */
    const handleCloseFormDialog = () => {
        if (!isProcessing) setTargetEditRestaurant(null);
    };

    /**
     * resets the target restaurants of delete dialog
     * @return nothing
     */
    const handleCloseDeleteDialog = () => {
        if (!isProcessing) setTargetDeleteRestaurant(null);
    };

    /**
     * creates new restaurant
     * @param {Restaurant} data data of a restaurant
     * @return nothing
     */
    const handleCreateRestaurant = async (data: Restaurant) => {
        setIsProcessing(true);
        await createRestaurantService(data, dispatch);
        setIsProcessing(false);
        setTargetEditRestaurant(null);
    };

    /**
     * edits restaurant
     * @param {Restaurant} data data of a restaurant
     * @return nothing
     */
    const handleEditRestaurant = async (data: Restaurant) => {
        if (targetEditRestaurant) {
            setIsProcessing(true);
            await editRestaurantService(data, dispatch);
            setIsProcessing(false);
            setTargetEditRestaurant(null);
        }
    };

    /**
     * deletes a restaurant
     * @return nothing
     */
    const handleDeleteRestaurant = async () => {
        if (targetDeleteRestaurant) {
            setIsProcessing(true);
            await deleteRestaurantService(targetDeleteRestaurant, dispatch);
            setIsProcessing(false);
            setTargetDeleteRestaurant(null);
        }
    };

    const filteredRestaurants = useMemo(
        () =>
            restaurants.filter((r) => {
                const matchesSearch =
                    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                const matchesVeg =
                    vegFilter === 'all' ||
                    (vegFilter === 'veg' && r.isVeg) ||
                    (vegFilter === 'non-veg' && !r.isVeg);

                return matchesSearch && matchesVeg;
            }),
        [restaurants, searchQuery, vegFilter],
    );

    // update Redux store with loader data on load
    useEffect(() => {
        void getRestaurantsService(dispatch);
    }, [navigate, dispatch]);

    return (
        <StyledContainer maxWidth="xl">
            <HeaderStack
                direction="row"
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                spacing={2}
            >
                <Box>
                    <Typography variant="h2" component="h1" fontWeight="bold">
                        {isOwnerView ? 'My Restaurants' : 'Explore Restaurants'}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {isOwnerView
                            ? 'Manage your menus, opening schedules, and listings.'
                            : 'Discover top-rated spots and treat your appetite.'}
                    </Typography>
                </Box>

                {isOwnerView && (
                    <StyledAddButton
                        variant="outlined"
                        size={canShow ? 'large' : 'small'}
                        startIcon={<AddIcon />}
                        onClick={() =>
                            setTargetEditRestaurant(initialRestaurantState)
                        }
                    >
                        {canShow && 'Add New Restaurant'}
                    </StyledAddButton>
                )}
            </HeaderStack>

            <FilterStack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <SearchFieldContainer>
                    <StyledField
                        fullWidth
                        placeholder="Search restaurants by name or description"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </SearchFieldContainer>

                <ToggleButtonGroup
                    value={vegFilter}
                    size="small"
                    aria-label="filter"
                >
                    <StyledToggleButton
                        onClick={() => setVegFilter('all')}
                        value="all"
                    >
                        All
                    </StyledToggleButton>
                    <StyledToggleButton
                        onClick={() => setVegFilter('veg')}
                        value="veg"
                    >
                        Pure Veg
                    </StyledToggleButton>
                    <StyledToggleButton
                        onClick={() => setVegFilter('non-veg')}
                        value="non-veg"
                    >
                        Non-Veg
                    </StyledToggleButton>
                </ToggleButtonGroup>
            </FilterStack>

            <RestaurantGrid>
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        navigate={navigate}
                        isOwnerView={isOwnerView}
                        onEdit={() => setTargetEditRestaurant(restaurant)}
                        onDelete={() => setTargetDeleteRestaurant(restaurant)}
                    />
                ))}

                {filteredRestaurants.length === 0 && (
                    <EmptyStateBox>
                        <Typography variant="h6" color="text.secondary">
                            No matching restaurants found.
                        </Typography>
                    </EmptyStateBox>
                )}
            </RestaurantGrid>

            <RestaurantFormDialog
                restaurant={targetEditRestaurant || initialRestaurantState}
                isProcessing={isProcessing}
                isOpen={!!targetEditRestaurant}
                handleClose={handleCloseFormDialog}
                handleCreateRestaurant={handleCreateRestaurant}
                handleEditRestaurant={handleEditRestaurant}
            />

            <DeleteDialog
                name={targetDeleteRestaurant?.name}
                isProcessing={isProcessing}
                handleClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteRestaurant}
            />
        </StyledContainer>
    );
};
