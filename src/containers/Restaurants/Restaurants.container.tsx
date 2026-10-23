import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

import { Add, Clear, Search } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import {
    Button,
    DeleteDialog,
    Grid,
    RestaurantCard,
    Tooltip,
} from '@components';
import { RestaurantFormDialog } from '@containers';
import {
    createRestaurantService,
    deleteRestaurantService,
    editRestaurantService,
    getRestaurantsService,
} from '@services';
import { useAppDispatch, useAppSelector } from '@store';
import { Restaurant } from '@types';
import { startLoading } from '@utils';

import { StyledToggleButton } from './Restaurants.styles';
import { Category } from './Restaurants.types';

export const Restaurants = () => {
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const canShow = useMediaQuery((th) => th.breakpoints.up('md'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    const restaurants = useAppSelector((state) => state.restaurant.restaurants);

    const [searchQuery, setSearchQuery] = useState('');
    const [vegFilter, setVegFilter] = useState<Category>('all');

    const [isProcessing, setIsProcessing] = useState(false);
    const [targetDeleteRestaurant, setTargetDeleteRestaurant] =
        useState<Restaurant | null>(null);
    const [targetEditRestaurant, setTargetEditRestaurant] =
        useState<Restaurant | null>(null);

    // Infinite-scroll state
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const loadingMoreRef = useRef(false);

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
        if (filter) {
            setVegFilter(filter);
        }
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

    /**sets target edit restaurant */
    const handleTargetEditRestaurant = (restaurant: Restaurant) => {
        setTargetEditRestaurant(restaurant);
    };

    /**sets target delete restaurant */
    const handleTargetDeleteRestaurant = (restaurant: Restaurant) => {
        setTargetDeleteRestaurant(restaurant);
    };

    /**updated search query with the input change */
    const handleSearchFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(e.target.value);

    /**clears search query */
    const handleSearchFieldClear = () => setSearchQuery('');

    const filteredRestaurants = useMemo(
        () =>
            restaurants?.filter((restaurant) => {
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
        let cancelled = false;

        startLoading(dispatch);

        void getRestaurantsService(dispatch).then((cursor) => {
            if (cancelled) return;

            setNextCursor(cursor);
            setHasMore(Boolean(cursor));
        });

        return () => {
            cancelled = true;
        };
    }, [dispatch]);

    useEffect(() => {
        const target = loadMoreRef.current;

        if (!target || !hasMore || !nextCursor) return;

        const getMoreRest = async (entry: IntersectionObserverEntry) => {
            if (!entry.isIntersecting || loadingMoreRef.current) return;

            loadingMoreRef.current = true;
            setIsLoadingMore(true);

            try {
                const cursor = await getRestaurantsService(
                    dispatch,
                    nextCursor,
                );

                setNextCursor(cursor);
                setHasMore(Boolean(cursor));
            } finally {
                loadingMoreRef.current = false;
                setIsLoadingMore(false);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => void getMoreRest(entry),
            {
                rootMargin: '200px',
            },
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [dispatch, hasMore, nextCursor]);

    return (
        restaurants && (
            <>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems={{ xs: 'stretch', md: 'center' }}
                    gap={2}
                    mb={4}
                >
                    <Box>
                        <Typography variant="h2" component="h1">
                            {isOwnerView
                                ? 'My Restaurants'
                                : 'Explore Restaurants'}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {isOwnerView
                                ? 'Manage your menus, opening schedules, and listings.'
                                : 'Discover top-rated spots and treat your appetite.'}
                        </Typography>
                    </Box>
                    {isOwnerView && (
                        <Tooltip title="Add New Restaurant" mustShow={!canShow}>
                            <Button
                                isAddButton={true}
                                variant="outlined"
                                size={canShow ? 'large' : 'small'}
                                startIcon={<Add />}
                                aria-label="Add New Restaurant"
                                onClick={() =>
                                    handleTargetEditRestaurant(
                                        initialRestaurantState,
                                    )
                                }
                            >
                                {canShow && 'Add New Restaurant'}
                            </Button>
                        </Tooltip>
                    )}
                </Box>
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={2}
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                >
                    <Box
                        width={canShow ? theme.typography.pxToRem(390) : '100%'}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search restaurants by name or description"
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={handleSearchFieldChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: searchQuery && (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleSearchFieldClear}
                                            >
                                                <Clear color="action" />
                                            </IconButton>
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
                </Box>
                {filteredRestaurants?.length === 0 ? (
                    <Box mt="30dvh" textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary">
                            No restaurants found.
                        </Typography>
                    </Box>
                ) : (
                    <Grid>
                        {filteredRestaurants?.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                                isOwnerView={isOwnerView}
                                onEdit={() =>
                                    handleTargetEditRestaurant(restaurant)
                                }
                                onDelete={() =>
                                    handleTargetDeleteRestaurant(restaurant)
                                }
                            />
                        ))}
                    </Grid>
                )}
                <Box ref={loadMoreRef} minHeight={1} />
                {isLoadingMore && (
                    <Box textAlign="center" py={3}>
                        <Typography color="text.secondary">
                            Loading more restaurants...
                        </Typography>
                    </Box>
                )}
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
            </>
        )
    );
};
