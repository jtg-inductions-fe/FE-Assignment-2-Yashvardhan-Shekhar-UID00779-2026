import { useNavigate } from 'react-router';

import { AccessTime, Delete, Edit } from '@mui/icons-material';
import {
    Box,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';

import foodIllustration from '@assets/images/food-illustration.webp';
import { Card, Tooltip } from '@components';
import { PATH } from '@constant';
import { formatTime } from '@utils';

import { RestaurantCardProps } from './RestaurantCard.types';

export const RestaurantCard = (props: RestaurantCardProps) => {
    const { restaurant, isOwnerView, onEdit, onDelete } = props;
    const navigate = useNavigate();
    const theme = useTheme();

    const description =
        restaurant.description ||
        `Welcome to ${restaurant.name}! We are open and ready to serve you from ${restaurant.openingTime} until ${restaurant.closingTime}. Stop by to experience our excellent service and friendly team.`;

    /** on click navigate to /rid of restaurant */
    const id = restaurant.id;
    const handleCardClick = () => {
        void navigate(PATH.HOME + '/' + id);
    };

    /** triggers delete dialog */
    const handleDeleteClick = () => {
        onDelete(id);
    };

    /** triggers delete dialog */
    const handleEditClick = () => {
        onEdit(id);
    };

    return (
        <CardActionArea component="div" onClick={handleCardClick}>
            <Card elevation={2}>
                <Box>
                    <CardMedia
                        component="img"
                        height="180"
                        image={restaurant.image || foodIllustration}
                        onError={(e) => {
                            e.currentTarget.src = foodIllustration;
                        }}
                        alt={restaurant.name}
                    />
                    <Chip
                        label={restaurant.isVeg ? 'Pure Veg' : 'Non-Veg'}
                        color={restaurant.isVeg ? 'success' : 'error'}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: theme.typography.pxToRem(12),
                            right: theme.typography.pxToRem(12),
                        }}
                    />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                        {restaurant.name}
                    </Typography>
                    <Tooltip title={description}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ...theme.mixins.lineClamp(3) }}
                        >
                            {description}
                        </Typography>
                    </Tooltip>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        padding: 4,
                        paddingTop: 0,
                        justifyContent: isOwnerView
                            ? 'space-between'
                            : 'flex-start',
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gap={1}
                        color="text.secondary"
                    >
                        <AccessTime fontSize="small" />
                        <Typography variant="caption">
                            {formatTime(restaurant.openingTime)} -{' '}
                            {formatTime(restaurant.closingTime)}
                        </Typography>
                    </Box>
                    {isOwnerView && (
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick();
                                }}
                                sx={{ px: 3 }}
                                aria-label="edit restaurant"
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick();
                                }}
                                sx={{ px: 3 }}
                                aria-label="delete restaurant"
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    )}
                </CardActions>
            </Card>
        </CardActionArea>
    );
};
