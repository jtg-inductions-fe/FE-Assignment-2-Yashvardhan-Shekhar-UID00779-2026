import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInput } from 'types';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    Typography,
} from '@mui/material';

import { login } from '@services';
import { StyledButton, StyledTextField } from '@styles';

interface LoginProps {
    onSwitchToSignUp?: () => void;
}

const Login = ({ onSwitchToSignUp }: LoginProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        setIsLoading(true);
        await login(data);
        setIsLoading(false);
    };

    return (
        <form
            onSubmit={(e) => {
                void handleSubmit(onSubmit)(e);
            }}
            noValidate
        >
            <Stack spacing={2.5}>
                <StyledTextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />

                <StyledTextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
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
                    {...register('password', {
                        required: 'Password is required',
                    })}
                />

                <StyledButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={isLoading}
                    loadingPosition="end"
                    sx={{ mt: '2rem !important' }}
                >
                    Log In
                </StyledButton>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Don &apos; t have an account?{' '}
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            underline="hover"
                            onClick={onSwitchToSignUp}
                            sx={{ fontWeight: 'bold' }}
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </form>
    );
};

export { Login };
