import { Box, CardMedia, IconButton, Stack, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const RowContainer = styled(Stack)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}));

export const ItemMedia = styled(CardMedia)(({ theme }) => ({
    width: theme.typography.pxToRem(64),
    height: theme.typography.pxToRem(64),
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS / 2),
    objectFit: 'cover',
})) as typeof CardMedia;

export const InfoContainer = styled(Box)({
    flexGrow: 1,
    minWidth: 0,
});

export const QuantityControlStack = styled(Stack)(({ theme }) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
}));

export const QuantityIconButton = styled(IconButton)({
    padding: 4,
});
