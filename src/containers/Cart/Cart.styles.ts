import { Box, Divider, Stack, styled } from '@mui/material';

export const HeaderStack = styled(Stack)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
    marginBlock: theme.spacing(2),
}));

export const SummaryRow = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: theme.spacing(1),
}));

export const SummaryRowLast = styled(SummaryRow)(({ theme }) => ({
    marginBottom: theme.typography.pxToRem(10),
}));
export const EmptyStateBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    paddingBlock: theme.spacing(8),
}));
