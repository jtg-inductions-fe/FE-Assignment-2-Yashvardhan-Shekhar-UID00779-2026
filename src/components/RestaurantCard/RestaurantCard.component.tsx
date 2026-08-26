import React from 'react';

import { NavigateFunction } from 'react-router';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import { IMAGE } from '@constant';
import { Restaurant } from '@types';
import { formatTime } from '@utils';

import {
    DescriptionText,
    StyledCardActions,
    StyledChip,
    StyledRestaurantCard,
} from './RestaurantCard.styles';

type RestaurantCardProps = {
    restaurant: Restaurant;
    isOwnerView?: boolean;
    navigate: NavigateFunction;
    onCardClick?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
    restaurant,
    isOwnerView = false,
    navigate,
    onEdit,
    onDelete,
}) => (
    <StyledRestaurantCard elevation={2}>
        <CardActionArea
            onClick={() => void navigate(`/restaurant/${restaurant.id}`)}
        >
            <Box>
                <CardMedia
                    component="img"
                    height="180"
                    image={restaurant.image || IMAGE}
                    alt={restaurant.name}
                    onError={(e) => (e.currentTarget.src = IMAGE)}
                />
                <StyledChip
                    label={restaurant.isVeg ? 'Pure Veg' : 'Non-Veg'}
                    color={restaurant.isVeg ? 'success' : 'error'}
                    size="small"
                />
            </Box>

            <CardContent>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {restaurant.name}
                </Typography>

                <DescriptionText variant="body2" color="text.secondary">
                    {restaurant.description ||
                        `Welcome to ${restaurant.name}! We are open and ready to serve you from ${restaurant.openingTime} until ${restaurant.closingTime}. Stop by to experience our excellent service and friendly team.`}
                </DescriptionText>
            </CardContent>
        </CardActionArea>

        <StyledCardActions
            sx={{
                justifyContent: isOwnerView ? 'space-between' : 'flex-start',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                color="text.secondary"
            >
                <AccessTimeIcon fontSize="small" />
                <Typography variant="caption">
                    {formatTime(restaurant.openingTime)} -{' '}
                    {formatTime(restaurant.closingTime)}
                </Typography>
            </Stack>
            {isOwnerView && (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(restaurant.id);
                        }}
                        aria-label="edit restaurant"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(restaurant.id);
                        }}
                        aria-label="delete restaurant"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            )}
        </StyledCardActions>
    </StyledRestaurantCard>
);
