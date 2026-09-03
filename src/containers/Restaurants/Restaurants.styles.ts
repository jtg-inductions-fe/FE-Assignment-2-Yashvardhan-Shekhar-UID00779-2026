import { styled, ToggleButton } from '@mui/material';

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    paddingInline: theme.typography.pxToRem(16),
}));
