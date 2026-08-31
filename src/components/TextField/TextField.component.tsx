import { useFormContext } from 'react-hook-form';

import { TextField as MuiTextField } from '@mui/material';

import { TextFieldProps } from './TextField.types';

export const TextField = (allProps: TextFieldProps) => {
    const { field, ...props } = allProps;

    const {
        formState: { errors },
        register,
    } = useFormContext();

    return (
        <MuiTextField
            {...props}
            error={Boolean(errors[field])}
            helperText={errors[field]?.message as string}
            {...register(field)}
        />
    );
};
