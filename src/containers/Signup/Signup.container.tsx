import { useState } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Box, Link, Stack, Typography } from '@mui/material';

import { Button, PasswordField, RadioField, TextField } from '@components';
import { PATH } from '@constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { SignupSchema } from './Signup.config';
import { SignupInput } from './Signup.types';

export const Signup = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const methods = useForm<SignupInput>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            role: 'customer',
        },
    });

    /**
     *  handle toggle of the password visibility
     *  @param data data of the form
     */
    const handleClick: SubmitHandler<SignupInput> = async (
        data,
    ): Promise<void> => {
        try {
            setIsLoading(true);
            await signUp(data, dispatch);
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
                    void methods.handleSubmit(handleClick)(e);
                }}
                noValidate
            >
                <Stack spacing={2}>
                    <TextField label="Your Name" field="name" />
                    <TextField
                        label="Email Address"
                        type="email"
                        field="email"
                    />
                    <PasswordField label="Password" field="password" />
                    <PasswordField
                        label="Confirm Password"
                        field="confirmPassword"
                    />
                    <RadioField
                        fieldName="role"
                        heading="Account Type"
                        options={['customer', 'owner']}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        loading={isLoading}
                        loadingPosition="end"
                    >
                        Sign Up
                    </Button>
                    <Box textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link
                                component="button"
                                type="button"
                                variant="body2"
                                underline="hover"
                                 onClick={() => void navigate(PATH.LOGIN)}
                                fontWeight="bold"
                            >
                                Log In
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </FormProvider>
    );
};
