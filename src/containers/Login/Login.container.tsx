import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    Typography,
} from '@mui/material';

import { Button, TextField } from '@components';
import { login } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { LoginInput, LoginProp } from './Login.types';

export const Login = ({ onSwitchToSignUp }: LoginProp) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClick: SubmitHandler<LoginInput> = async (data) => {
        try {
            setIsLoading(true);
            await login(data, dispatch);
        } catch (e) {
            handleErrorFeedback(e, dispatch);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                void handleSubmit(handleClick)(e);
            }}
            noValidate
        >
            <Stack spacing={2}>
                {/* email field */}
                <TextField
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

                {/* Password field */}
                <TextField
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

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={isLoading}
                    loadingPosition="end"
                >
                    Log In
                </Button>

                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        {"Don't "}have an account?{' '}
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            underline="hover"
                            onClick={onSwitchToSignUp}
                            fontWeight="bold"
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </form>
    );
};
