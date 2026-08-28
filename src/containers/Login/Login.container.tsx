import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { Button, IconTextField } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { schema } from './Login.schema';
import { LoginInput, LoginProp } from './Login.types';

export const Login = (props: LoginProp) => {
    const { onSwitchToSignUp } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(schema),
    });

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

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
                    {...register('email')}
                />

                {/* Password field */}
                <IconTextField
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
                    {...register('password')}
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
