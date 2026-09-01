import { AccordionDetails, Chip, styled } from '@mui/material';

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.action.hover,
}));

export const StatusChip = styled(Chip)({
    fontWeight: 'bold',
    textTransform: 'capitalize',
});
