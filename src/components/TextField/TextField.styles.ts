import { styled, TextField } from '@mui/material';

export const StyledIconTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        borderTopRightRadius: 1,
        borderBottomRightRadius: 0,
    },
});
