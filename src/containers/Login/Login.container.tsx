import { useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Box, Link, Stack, TextField, Typography } from '@mui/material';

import { Button, PasswordField } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { LoginSchema } from './Login.schema';
import { LoginInput, LoginProp } from './Login.types';

export const Login = (props: LoginProp) => {
    const { onSwitchToSignUp } = props;

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

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
                <PasswordField
                    label="Password"
                    isError={!!errors.password}
                    helperText={errors.password?.message}
                    registerPassword={{ ...register('password') }}
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
                        {"Don't have an account? "}
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
