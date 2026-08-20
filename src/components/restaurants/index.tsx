import { useMemo, useState } from 'react';

import { DeleteRestaurantDialog } from 'components/RestaurantDeleteDialog';
import { RestaurantFormDialog } from 'components/RestaurantFormDialog';
import { useLoaderData } from 'react-router';
import {
    handleCreateRestaurant,
    handleDeleteRestaurant,
    handleEditRestaurant,
} from 'utils/restaurants.util';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Container,
    InputAdornment,
    Stack,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { RestaurantCard } from '@components';
import { useAppSelector } from '@store';
import { StyledAddButton, StyledField, StyledToggleButton } from '@styles';
import { Restaurant } from '@types';

export const Restaurants = () => {
    const theme = useTheme();
    const canShow = useMediaQuery(theme.breakpoints.up('sm'));

    const isOwnerView = useAppSelector((state) => state.user.role) === 'owner';

    const [restaurants, setRestaurants] =
        useState<Restaurant[]>(useLoaderData());

    const [searchQuery, setSearchQuery] = useState('');
    const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

    const [isProcessing, setIsProcessing] = useState(false);
    const [targetDeleteRestaurant, setTargetDeleteRestaurant] =
        useState<Restaurant | null>(null);
    const [targetEditRestaurant, setTargetEditRestaurant] =
        useState<Restaurant | null>(null);

    const onCreateRestaurant = async (data: Restaurant) => {
        if (targetEditRestaurant) {
            setIsProcessing(true);
            setRestaurants(await handleCreateRestaurant(restaurants, data));
            setIsProcessing(false);
            setTargetEditRestaurant(null);
        }
    };

    const onEditRestaurant = async (data: Restaurant) => {
        if (targetEditRestaurant) {
            setIsProcessing(true);
            setRestaurants(await handleEditRestaurant(restaurants, data));
            setIsProcessing(false);
            setTargetEditRestaurant(null);
        }
    };

    const onDeleteRestaurant = async () => {
        if (targetDeleteRestaurant) {
            setIsProcessing(true);
            setRestaurants(
                await handleDeleteRestaurant(
                    restaurants,
                    targetDeleteRestaurant?.id,
                ),
            );
            setIsProcessing(false);
            setTargetDeleteRestaurant(null);
        }
    };

    const onClose = () => setTargetDeleteRestaurant(null);

    // Filter logic based on Owner permissions, search term, and veg status
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
                    (vegFilter === 'nonveg' && !r.isVeg);

                return matchesSearch && matchesVeg;
            }),
        [restaurants, searchQuery, vegFilter],
    );

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                spacing={2}
                sx={{ mb: 4 }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: 800 }}
                    >
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
                            setTargetEditRestaurant({
                                id: '',
                                name: '',
                                description: '',
                                openingTime: '09:00',
                                closingTime: '22:00',
                                isVeg: false,
                                image: '',
                                owner: '',
                            })
                        }
                    >
                        {canShow && 'Add New Restaurant'}
                    </StyledAddButton>
                )}
            </Stack>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
            >
                <StyledField
                    placeholder="Search restaurants by name or description"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: { xs: '100%', sm: 390 } }}
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
                        onClick={() => setVegFilter('nonveg')}
                        value="nonveg"
                    >
                        Non-Veg
                    </StyledToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: 3,
                }}
            >
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        isOwnerView={isOwnerView}
                        onEdit={() => setTargetEditRestaurant(restaurant)}
                        onDelete={() => setTargetDeleteRestaurant(restaurant)}
                    />
                ))}

                {filteredRestaurants.length === 0 && (
                    <Box
                        sx={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            py: 8,
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            No matching restaurants found.
                        </Typography>
                    </Box>
                )}
            </Box>

            {targetEditRestaurant && (
                <RestaurantFormDialog
                    restaurant={targetEditRestaurant}
                    onClose={() => setTargetEditRestaurant(null)}
                    isProcessing={isProcessing}
                    onCreateRestaurant={onCreateRestaurant}
                    onEditRestaurant={onEditRestaurant}
                />
            )}

            {targetDeleteRestaurant && (
                <DeleteRestaurantDialog
                    restaurantName={targetDeleteRestaurant?.name}
                    isProcessing={isProcessing}
                    onClose={onClose}
                    onConfirm={() => void onDeleteRestaurant()}
                />
            )}
        </Container>
    );
};
