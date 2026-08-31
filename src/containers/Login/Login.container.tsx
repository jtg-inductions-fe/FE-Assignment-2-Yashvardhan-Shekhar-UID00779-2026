import { useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Box, Link, Stack, Typography } from '@mui/material';

import { Button, PasswordField, TextField } from '@components';
import { PATH } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { LoginSchema } from './Login.config';
import { LoginInput } from './Login.types';

export const Login = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const methods = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const { handleSubmit } = methods;

    /**
     * handle password validation state
     * @param data data of userid and password for login
     */
    const handleClick: SubmitHandler<LoginInput> = async (data) => {
        try {
            setIsLoading(true);
            await login(data, dispatch);
            await navigate(PATH.HOME);
        } catch (e) {
            handleErrorFeedback(e, dispatch);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
                fontWeight="medium"
                >
                Log in
            </Typography>
                <Box
                    component="form"
                onSubmit={(e) => {
                    void handleSubmit(handleClick)(e);
                }}
                noValidate
            >
                <Stack spacing={2}>
                    <TextField
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        field="email"
                    />
                    <PasswordField label="Password" field="password" />
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
                                onClick={() => void navigate(PATH.SIGNUP)}
                                fontWeight="bold"
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </FormProvider>
    );
};
