import { useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { signUp } from 'services/auth';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    Typography,
} from '@mui/material';

import { StyledButton, StyledTextField } from '@styles';
import { SignupInput } from '@types';

interface SignupProps {
    onSwitchToLogin?: () => void;
}

const Signup = ({ onSwitchToLogin }: SignupProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<SignupInput>({
        defaultValues: {
            role: 'customer',
        },
    });

    const password = watch('password');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const onSubmit: SubmitHandler<SignupInput> = async (data) => {
        setIsLoading(true);
        await signUp(data);
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
                {/* Name Field */}
                <StyledTextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    {...register('name', {
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name must be at least 3 characters',
                        },
                    })}
                />

                {/* Email Field */}
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
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    })}
                />

                {/* Password Field */}
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
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                />

                {/* Confirm Password Field */}
                <StyledTextField
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
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
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === password || 'Passwords do not match',
                    })}
                />

                {/* Role Radio Group */}
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.role)}
                            sx={{ ml: '1rem !important' }}
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
                <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    loading={isLoading}
                    loadingPosition="end"
                >
                    Sign Up
                </StyledButton>

                {/* Bottom Switch to Login */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            underline="hover"
                            onClick={onSwitchToLogin}
                            sx={{ fontWeight: 'bold' }}
                        >
                            Log In
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </form>
    );
};

export default Signup;
