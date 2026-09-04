import { useNavigate } from 'react-router';

import { AccessTime, Delete, Edit } from '@mui/icons-material';
import {
    Box,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { Card } from '@components';
import { PATH } from '@constant';
import { formatTime } from '@utils';

import { StyledChip } from './RestaurantCard.styles';
import { RestaurantCardProps } from './RestaurantCard.types';

export const RestaurantCard = (props: RestaurantCardProps) => {
    const { restaurant, isOwnerView, onEdit, onDelete } = props;
    const navigate = useNavigate();
    const theme = useTheme();

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
        <Card elevation={2}>
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
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ...theme.mixins.lineClamp(3) }}
                    >
                        {restaurant.description ||
                            `Welcome to ${restaurant.name}! We are open and ready to serve you from ${restaurant.openingTime} until ${restaurant.closingTime}. Stop by to experience our excellent service and friendly team.`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{
                    display: 'flex',
                    padding: theme.typography.pxToRem(16),
                    paddingTop: 0,
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
                            onClick={handleEditClick}
                            aria-label="edit restaurant"
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={handleDeleteClick}
                            aria-label="delete restaurant"
                        >
                            <Delete />
                        </IconButton>
                    </Stack>
                )}
            </CardActions>
        </Card>
    );
};
