import { IconButton, Stack, styled } from '@mui/material';

export const QuantityControlStack = styled(Stack)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
}));

export const QuantityIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1, 2),
}));
