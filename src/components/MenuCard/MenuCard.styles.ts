import { Box, CardActions, IconButton, styled } from '@mui/material';

export const QuantityIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: '40%',
    textAlign: 'start',
    alignSelf: 'start',
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4),
    paddingTop: 0,
}));

export const QuantityControlStack = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
}));
