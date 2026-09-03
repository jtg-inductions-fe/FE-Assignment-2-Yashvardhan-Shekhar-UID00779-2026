import { Button as MuiButton, ButtonProps } from '@mui/material';

export const Button = (props: ButtonProps) => (
    <MuiButton sx={{ p: 4 }} {...props} />
);
