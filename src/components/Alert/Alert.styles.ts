import { Alert, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const StyledAlert = styled(Alert)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
}));
