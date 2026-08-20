import React from 'react';

import { useNavigate } from 'react-router';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Stack,
    styled,
    Typography,
} from '@mui/material';

import { BORDER_RADIUS, IMAGE } from '@constant';
import { StyledRestaurantCard } from '@styles';
import { Restaurant } from '@types';
import { formatTime } from '@utils';

type RestaurantCardProps = {
    restaurant: Restaurant;
    isOwnerView?: boolean;
    onCardClick?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
};

// Styled Wrapper extension for layout behavior

const StyledChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.typography.pxToRem(12),
    right: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS / 2),
}));

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
    restaurant,
    isOwnerView = false,
    onEdit,
    onDelete,
}) => {
    const navigate = useNavigate();

    return (
        <StyledRestaurantCard elevation={2}>
            <CardActionArea
                onClick={() => void navigate(`/restaurant'${restaurant.id}`)}
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

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {restaurant.description ||
                            `Welcome to ${restaurant.name}! We are open and ready to serve you from ${restaurant.openingTime} until ${restaurant.closingTime}. Stop by to experience our excellent service and friendly team.`}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: isOwnerView ? 'space-between' : 'start',
                    p: (theme) => theme.typography.pxToRem(16),
                    pt: 0,
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
            </CardActions>
        </StyledRestaurantCard>
    );
};
