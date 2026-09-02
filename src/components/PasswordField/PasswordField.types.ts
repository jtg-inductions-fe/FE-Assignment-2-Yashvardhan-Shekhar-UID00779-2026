import { TextFieldProps } from '@mui/material/TextField';

/**
 * Represents the properties accepted by the password field component.
 */
export type PasswordFieldProps = TextFieldProps & {
    field: string;
};
