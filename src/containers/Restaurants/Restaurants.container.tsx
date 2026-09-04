import { useEffect, useMemo, useState } from 'react';

import { Add, Search } from '@mui/icons-material';
import {
    Box,
    Container,
    InputAdornment,
    Stack,
    TextField,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { AddButton, DeleteDialog, Grid, RestaurantCard } from '@components';
import { RestaurantFormDialog } from '@containers';
import {
    createRestaurantService,
    deleteRestaurantService,
    editRestaurantService,
    getRestaurantsService,
} from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { Restaurant } from '@types';

import { StyledToggleButton } from './Restaurants.styles';
import { Category } from './Restaurants.types';

export const Restaurants = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const canShow = useMediaQuery((th) => th.breakpoints.up('sm'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    const restaurants = useAppSelector((state) => state.restaurant.restaurants);

    const [searchQuery, setSearchQuery] = useState('');
    const [vegFilter, setVegFilter] = useState<Category>('all');

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
     * handle category change
     * @param _event element that triggers it
     * @param filter new category will be
     */
    const handleCategoryChange = (
        _event: React.MouseEvent<HTMLElement>,
        filter: Category,
    ) => {
        setVegFilter(filter);
    };

    /**resets the target restaurants of form dialog */
    const handleCloseFormDialog = () => {
        if (!isProcessing) setTargetEditRestaurant(null);
    };

    /** resets the target restaurants of delete dialog */
    const handleCloseDeleteDialog = () => {
        if (!isProcessing) setTargetDeleteRestaurant(null);
    };

    /**
     * creates new restaurant
     * @param data data of a restaurant
     */
    const handleCreateRestaurant = async (data: Restaurant) => {
        setIsProcessing(true);
        await createRestaurantService(data, dispatch);
        setIsProcessing(false);
        setTargetEditRestaurant(null);
    };

    /**
     * edits restaurant
     * @param data data of a restaurant
     */
    const handleEditRestaurant = async (data: Restaurant) => {
        if (targetEditRestaurant) {
            setIsProcessing(true);
            await editRestaurantService(data, dispatch);
            setIsProcessing(false);
            setTargetEditRestaurant(null);
        }
    };

    /** deletes a restaurant  */
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
            restaurants.filter((restaurant) => {
                const matchesSearch =
                    restaurant.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    restaurant.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                const matchesVeg =
                    vegFilter === 'all' ||
                    (vegFilter === 'veg' && restaurant.isVeg) ||
                    (vegFilter === 'non-veg' && !restaurant.isVeg);

                return matchesSearch && matchesVeg;
            }),
        [restaurants, searchQuery, vegFilter],
    );

    // update Redux store with loader data on load
    useEffect(() => {
        void getRestaurantsService(dispatch);
    }, [dispatch]);

    return (
        <Container maxWidth="xl" sx={{ paddingBlock: 4 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                spacing={2}
                mb={4}
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
                    <AddButton
                        variant="outlined"
                        size={canShow ? 'large' : 'small'}
                        startIcon={<Add />}
                        onClick={() =>
                            setTargetEditRestaurant(initialRestaurantState)
                        }
                    >
                        {canShow && 'Add New Restaurant'}
                    </AddButton>
                )}
            </Stack>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >
                <Box width={canShow ? theme.typography.pxToRem(390) : '100%'}>
                    <TextField
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
                                        <Search color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </Box>
                <ToggleButtonGroup
                    value={vegFilter}
                    size="small"
                    exclusive
                    aria-label="filter"
                    onChange={handleCategoryChange}
                >
                    <StyledToggleButton value="all">All</StyledToggleButton>
                    <StyledToggleButton value="veg">
                        Pure Veg
                    </StyledToggleButton>
                    <StyledToggleButton value="non-veg">
                        Non-Veg
                    </StyledToggleButton>
                </ToggleButtonGroup>
            </Stack>
            {filteredRestaurants.length === 0 && (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" color="text.secondary">
                        No matching restaurants found.
                    </Typography>
                </Box>
            )}
            <Grid>
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        isOwnerView={isOwnerView}
                        onEdit={() => setTargetEditRestaurant(restaurant)}
                        onDelete={() => setTargetDeleteRestaurant(restaurant)}
                    />
                ))}
            </Grid>
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
                handleConfirm={handleDeleteRestaurant}
            />
        </Container>
    );
};
