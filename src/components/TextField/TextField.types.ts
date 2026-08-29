import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Represents the properties accepted by the password field component.
 */
export type PasswordFieldProps = {
    label?: string;
    isError?: boolean;
    helperText?: string;
    register: UseFormRegisterReturn;
};
