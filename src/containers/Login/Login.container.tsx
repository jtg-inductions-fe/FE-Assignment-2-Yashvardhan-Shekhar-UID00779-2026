import { useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Box, Link, Stack, Typography } from '@mui/material';

import { Button, PasswordField, TextField } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { LoginSchema } from './Login.config';
import { LoginInput, LoginProp } from './Login.types';

export const Login = (props: LoginProp) => {
    const { onSwitchToSignUp } = props;

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
        } catch (e) {
            handleErrorFeedback(e, dispatch);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
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
                                onClick={onSwitchToSignUp}
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
