import { useFormContext } from 'react-hook-form';

import { TextField as MuiTextField } from '@mui/material';

import { TextFieldProps } from './TextField.types';

export const TextField = (props: TextFieldProps) => {
    const { field, ...rest } = props;

    const {
        formState: { errors },
        register,
    } = useFormContext();

    return (
        <MuiTextField
            {...rest}
            error={!!errors[field]}
            helperText={errors[field]?.message as string}
            {...register(field)}
        />
    );
};
