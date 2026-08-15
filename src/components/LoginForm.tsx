import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { logIn } from 'services/auth';
import { LoginInput } from 'types';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

interface LoginFormProps {
    onSwitchToSignUp?: () => void;
}

const LoginForm = ({ onSwitchToSignUp }: LoginFormProps) => {
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
        await logIn(data);
        setIsLoading(false);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
                Log In
            </Typography>

            <form
                onSubmit={(e) => {
                    void handleSubmit(onSubmit)(e);
                }}
                noValidate
            >
                <Stack spacing={2.5}>
                    <TextField
                        label="Email Address"
                        type="email"
                        variant="standard"
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

                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="standard"
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
                        color="primary"
                        fullWidth
                        loading={isLoading}
                        loadingPosition="end"
                        sx={{ mt: '2rem !important' }}
                    >
                        Log In
                    </Button>

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
        </Box>
    );
};

export default LoginForm;
