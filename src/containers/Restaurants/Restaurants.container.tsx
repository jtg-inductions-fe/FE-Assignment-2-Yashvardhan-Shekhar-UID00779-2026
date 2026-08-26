import { useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router';
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
    handleCreateRestaurant as createRestaurant,
    handleDeleteRestaurant as deleteRestaurant,
    handleEditRestaurant as editRestaurant,
} from '@services';
import { setRestaurants, useAppDispatch, useAppSelector } from '@store';
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

    const theme = useTheme();
    const canShow = useMediaQuery(theme.breakpoints.up('sm'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    const dispatch = useAppDispatch();
    const loaderData: Restaurant[] = useLoaderData();

    // restaurants list directly from Redux state
    const restaurants = useSelector(
        (state: RootState) => state.restaurant.restaurants,
    );

    // update Redux store with loader data on load
    useEffect(() => {
        if (loaderData) {
            dispatch(setRestaurants(loaderData));
        }
    }, [loaderData, dispatch]);

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

    const handleCreateRestaurant = (data: Restaurant) => {
        setIsProcessing(true);
        createRestaurant(data, dispatch);
        setIsProcessing(false);
        setTargetEditRestaurant(null);
    };

    const handleEditRestaurant = (data: Restaurant) => {
        if (targetEditRestaurant) {
            setIsProcessing(true);
            editRestaurant(data, dispatch);
            setIsProcessing(false);
            setTargetEditRestaurant(null);
        }
    };

    const handleDeleteRestaurant = () => {
        if (targetDeleteRestaurant) {
            setIsProcessing(true);
            deleteRestaurant(targetDeleteRestaurant, dispatch);
            setIsProcessing(false);
            setTargetDeleteRestaurant(null);
        }
    };

    const onClose = () => setTargetDeleteRestaurant(null);

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

    return (
        <StyledContainer maxWidth="xl">
            <HeaderStack
                direction="row"
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                spacing={2}
            >
                <Box>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        {isOwnerView ? 'My Restaurants' : 'Explore Restaurants'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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

            {!!targetEditRestaurant && (
                <RestaurantFormDialog
                    restaurant={targetEditRestaurant || initialRestaurantState}
                    isProcessing={isProcessing}
                    isOpen={!!targetEditRestaurant}
                    onClose={() => setTargetEditRestaurant(null)}
                    handleCreateRestaurant={handleCreateRestaurant}
                    handleEditRestaurant={handleEditRestaurant}
                />
            )}

            <DeleteDialog
                name={targetDeleteRestaurant?.name}
                isProcessing={isProcessing}
                onClose={onClose}
                onConfirm={() => void handleDeleteRestaurant()}
            />
        </StyledContainer>
    );
};
