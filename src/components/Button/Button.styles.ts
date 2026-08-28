import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.typography.pxToRem(16),
}));
