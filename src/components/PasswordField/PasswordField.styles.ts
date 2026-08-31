import { styled, TextField } from '@mui/material';

export const StyledIconTextField = styled(TextField)({
    'input:-webkit-autofill': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
});
