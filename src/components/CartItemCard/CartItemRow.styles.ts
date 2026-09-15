import { Box, IconButton, styled } from '@mui/material';

export const QuantityControlStack = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
}));

export const QuantityIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1, 2),
}));
