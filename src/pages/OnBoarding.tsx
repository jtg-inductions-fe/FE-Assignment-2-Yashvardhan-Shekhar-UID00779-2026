import { useState } from 'react';

import onboardingImg from 'assets/images/onboarding-bg.webp';

import { Box, Typography } from '@mui/material';

import { LoginForm, SignUpForm } from '@components';

const OnBoarding = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <Box
            sx={{
                height: '100vh',
                minHeight: 650,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'space-between', md: 'center' },
                gap: { xs: 3, md: 6 },
                p: { xs: 2, sm: 4, md: 6 },
            }}
        >
            <Box
                sx={{
                    maxHeight: { xs: 0, md: 'none' },
                    objectFit: 'contain',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                }}
                maxWidth="500px"
            >
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h1">Apna Restaurant</Typography>
                    <Typography>
                        {' '}
                        Discover local flavors as a customer or track kitchen
                        tickets as an owner. A single, fast platform designed
                        for both sides of the table.{' '}
                    </Typography>
                </Box>
                <Box
                    component="img"
                    src={onboardingImg}
                    alt="Onboarding Illustration"
                    sx={{
                        aspectRatio: '1/1',
                        alignSelf: 'center',
                        width: '100%',
                    }}
                />
            </Box>

            <Box
                sx={{
                    backgroundColor: '#F8F9FAb0',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 5,
                    p: 3,
                    width: '100%',
                    maxWidth: 450,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    {isLogin ? 'Log In' : 'Sign Up'}
                </Typography>

                {isLogin ? (
                    <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
                ) : (
                    <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
                )}
            </Box>
        </Box>
    );
};

export { OnBoarding };
