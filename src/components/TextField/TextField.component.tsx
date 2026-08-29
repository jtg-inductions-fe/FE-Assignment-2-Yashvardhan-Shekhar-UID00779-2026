import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TextFieldProps } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';

import { StyledIconTextField } from './TextField.styles';
import { PasswordFieldProps } from './TextField.types';

export const IconTextField = (props: TextFieldProps) => (
    <StyledIconTextField {...props} />
);

export const PasswordField = (props: PasswordFieldProps) => {
    const { label = 'Password', isError, helperText, register } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <IconTextField
            label={label}
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            error={isError}
            helperText={helperText}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={`toggle ${label} visibility`}
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
            {...register}
        />
    );
};
