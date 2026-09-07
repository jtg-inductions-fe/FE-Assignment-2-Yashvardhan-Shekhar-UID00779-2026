import { Box, Divider, styled } from '@mui/material';

export const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBlock: theme.spacing(2),
}));

export const SummaryRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: theme.spacing(1),
}));
