import { Dialog, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
        padding: theme.typography.pxToRem(8),
    },
}));
