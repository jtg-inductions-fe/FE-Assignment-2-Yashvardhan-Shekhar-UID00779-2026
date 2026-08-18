import { Button, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    padding: theme.typography.pxToRem(16),
}));
