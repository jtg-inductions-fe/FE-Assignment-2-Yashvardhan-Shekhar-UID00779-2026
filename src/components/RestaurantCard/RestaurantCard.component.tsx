import { useNavigate } from 'react-router';

import { AccessTime, Delete, Edit } from '@mui/icons-material';
import {
    Box,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';

import { formatTime } from '@utils';

import {
    DescriptionText,
    StyledCardActions,
    StyledChip,
    StyledRestaurantCard,
} from './RestaurantCard.styles';
import { RestaurantCardProps } from './RestaurantCard.types';

export const RestaurantCard = (props: RestaurantCardProps) => {
    const { restaurant, isOwnerView, onEdit, onDelete } = props;
    const navigate = useNavigate();

    /**
     * on click navigate to /rid of restaurant
     */
    const handleCardClick = () => {
        void navigate(`/restaurant/${restaurant.id}`);
    };

    return (
        <StyledRestaurantCard elevation={2}>
            <CardActionArea onClick={handleCardClick}>
                <Box>
                    <CardMedia
                        component="img"
                        height="180"
                        image={restaurant.image}
                        alt={restaurant.name}
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
                    justifyContent: isOwnerView
                        ? 'space-between'
                        : 'flex-start',
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    color="text.secondary"
                >
                    <AccessTime fontSize="small" />
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
                            <Edit />
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
                            <Delete />
                        </IconButton>
                    </Stack>
                )}
            </StyledCardActions>
        </StyledRestaurantCard>
    );
};
