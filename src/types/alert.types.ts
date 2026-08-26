import { AlertProps as MuiAlertProps } from '@mui/material';

// Defines the structure of an alert message.
export type Alert = Pick<MuiAlertProps, 'severity'> & {
    message: string;
};
