import { Button as MuiButton, ButtonProps } from '@mui/material';

export const Button = (props: ButtonProps) => (
    <MuiButton sx={{ py: 4, px: 8 }} {...props} />
);
