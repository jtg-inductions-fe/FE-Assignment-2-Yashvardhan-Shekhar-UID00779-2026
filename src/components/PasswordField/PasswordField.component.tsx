import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

import { StyledIconTextField } from './PasswordField.styles';
import { PasswordFieldProps } from './PasswordField.types';

export const PasswordField = (props: PasswordFieldProps) => {
    const { field, ...rest } = props;

    const {
        formState: { errors },
        register,
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);

    /**
     *  handle toggle of the password visibility
     */
    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    return (
        <StyledIconTextField
            {...rest}
            type={showPassword ? 'text' : 'password'}
            error={!!errors[field]}
            helperText={errors[field]?.message as string}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={`toggle visibility`}
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            {...register(field)}
        />
    );
};
