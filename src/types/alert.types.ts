import { AlertProps as MuiAlertProps } from '@mui/material';

/**
 * Represents an application alert containing a message and its severity level.
 */
export type Alert = Pick<MuiAlertProps, 'severity'> & {
    message: string;
};
