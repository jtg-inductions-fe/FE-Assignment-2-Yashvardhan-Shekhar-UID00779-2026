import { useState } from 'react';

import { PasswordFieldProps } from 'components/PasswordField/PasswordField.types';
import { useFormContext } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

import { StyledIconTextField } from './PasswordField.styles';

export const PasswordField = (allProps: PasswordFieldProps) => {
    const { field, ...props } = allProps;

    const {
        formState: { errors },
        register,
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);

    /**
     *  handle toggle of the password visibility
     *
     *  @returns {void} No value is returned
     */

    const handleClickShowPassword = (): void => {
        setShowPassword((show) => !show);
    };

    return (
        <StyledIconTextField
            {...props}
            type={showPassword ? 'text' : 'password'}
            error={!!errors[field]}
            helperText={errors[field]?.message}
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
