import { Button, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.typography.pxToRem(BORDER_RADIUS),
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: '10px',
    paddingBottom: '10px',
    margin: '2px',
}));
