import { IconButton, Stack, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const QuantityControlStack = styled(Stack)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    padding: theme.spacing(1, 0.5),
}));

export const QuantityIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
}));
