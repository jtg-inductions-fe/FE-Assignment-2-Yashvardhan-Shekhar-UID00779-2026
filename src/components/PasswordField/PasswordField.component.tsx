import { useState } from 'react';

import { PasswordFieldProps } from 'components/PasswordField/PasswordField.types';
import { IconTextField } from 'components/TextField';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

export const PasswordField = (props: PasswordFieldProps) => {
    const { label = 'Password', isError, helperText, registerPassword } = props;

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
            {...registerPassword}
        />
    );
};
