import {
    AccordionDetails,
    AccordionSummary,
    Chip,
    Divider,
    Stack,
    styled,
} from '@mui/material';

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.action.hover,
}));

export const StatusChip = styled(Chip)({
    fontWeight: 'bold',
    textTransform: 'capitalize',
});

export const ItemRow = styled(Stack)(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
}));

export const ItemRowFull = styled(ItemRow)({
    width: '100%',
});

export const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

export const ActionControlsStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));
