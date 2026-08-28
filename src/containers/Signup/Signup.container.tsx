import { useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    Link,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { Button, IconTextField } from '@components';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@services';
import { useAppDispatch } from '@store';
import { handleErrorFeedback } from '@utils';

import { schema } from './Signup.schema';
import { SignupInput, SignupProp } from './Signup.types';

export const Signup = (props: SignupProp) => {
    const { onSwitchToLogin } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: 'customer',
        },
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleClick: SubmitHandler<SignupInput> = async (data) => {
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
        <form
            onSubmit={(e) => {
                void handleSubmit(handleClick)(e);
            }}
            noValidate
        >
            <Stack spacing={2}>
                {/* Name Field */}
                <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    {...register('name')}
                />

                {/* Email Field */}
                <TextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register('email')}
                />

                {/* Password Field */}
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
                                <InputAdornment position="start">
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

                {/* Confirm Password Field */}
                <IconTextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    {...register('confirmPassword')}
                />

                {/* Role Radio Group */}
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.role)}
                        >
                            <FormLabel id="role-radio-group-label">
                                Account Type
                            </FormLabel>
                            <RadioGroup
                                {...field}
                                aria-labelledby="role-radio-group-label"
                                row
                            >
                                <FormControlLabel
                                    value="customer"
                                    control={<Radio />}
                                    label="Customer"
                                />
                                <FormControlLabel
                                    value="owner"
                                    control={<Radio />}
                                    label="Owner"
                                />
                            </RadioGroup>
                            {errors.role && (
                                <FormHelperText>
                                    {errors.role.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={isLoading}
                    loadingPosition="end"
                >
                    Sign Up
                </Button>

                {/* Bottom Switch to Login */}
                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            underline="hover"
                            onClick={onSwitchToLogin}
                            fontWeight="bold"
                        >
                            Log In
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </form>
    );
};
