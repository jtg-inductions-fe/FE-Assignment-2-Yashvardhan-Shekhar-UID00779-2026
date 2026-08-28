import { Alert, styled } from '@mui/material';

export const StyledAlert = styled(Alert)(({ theme }) => ({
    boxShadow: theme.shadows[5],
}));
