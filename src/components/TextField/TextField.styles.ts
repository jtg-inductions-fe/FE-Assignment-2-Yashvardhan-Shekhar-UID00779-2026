import { styled, TextField } from '@mui/material';

export const StyledIconTextField = styled(TextField)({
    '& .MuiInputBase-input:-webkit-autofill': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
});
