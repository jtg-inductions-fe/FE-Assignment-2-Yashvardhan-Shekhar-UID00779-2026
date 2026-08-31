import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Represents the properties accepted by the password field component.
 * @type {
 * label: string;
 * isError: boolean;
 * helperText?: string;
 * registerPassword: UseFormRegisterReturn;
 *  }
 */
export type PasswordFieldProps = {
    label?: string;
    isError?: boolean;
    helperText?: string;
    registerPassword: UseFormRegisterReturn;
};
