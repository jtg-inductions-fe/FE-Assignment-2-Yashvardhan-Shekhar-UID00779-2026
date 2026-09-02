import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

/**
 * text field props
 */
export type TextFieldProps = MuiTextFieldProps & {
    field: string;
};
