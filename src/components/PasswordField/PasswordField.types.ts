import { TextFieldProps } from '@mui/material/TextField';

/**
 * Represents the properties accepted by the password field component.
 * @type {
 * label: string;
 * isError: boolean;
 * helperText: string;
 * registerPassword: UseFormRegisterReturn;
 *  }
 */
export type PasswordFieldProps = TextFieldProps & {
    field: string;
};
