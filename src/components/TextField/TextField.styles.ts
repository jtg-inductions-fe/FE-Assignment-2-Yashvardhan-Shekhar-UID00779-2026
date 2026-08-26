import { styled, TextField } from '@mui/material';

import { BORDER_RADIUS } from '@constant';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.typography.pxToRem(BORDER_RADIUS),

        '& .MuiInputAdornment-root': {
            marginLeft: theme.typography.pxToRem(-40),
        },
    },
    '& .MuiInputBase-input': {
        paddingRight: theme.typography.pxToRem(40),
    },
}));
