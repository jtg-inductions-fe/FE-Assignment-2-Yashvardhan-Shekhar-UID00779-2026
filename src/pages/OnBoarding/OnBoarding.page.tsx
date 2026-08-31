import { useState } from 'react';

import { Typography } from '@mui/material';

import onboardingImg from '@assets/images/onboarding-bg.webp';
import { Login, Signup } from '@containers';

import {
    BrandingColumn,
    FormCard,
    HeaderTextWrapper,
    OnboardingImage,
    PageContainer,
} from './OnBoarding.styles';

export const OnBoarding = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <PageContainer>
            <BrandingColumn>
                <HeaderTextWrapper>
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Apna Restaurant
                    </Typography>
                    <Typography color="text.secondary">
                        Discover local flavors as a customer or track kitchen
                        tickets as an owner. A single, fast platform designed
                        for both sides of the table.
                    </Typography>
                </HeaderTextWrapper>
                <OnboardingImage
                    component="img"
                    src={onboardingImg}
                    alt="Onboarding-Illustration"
                />
            </BrandingColumn>
            <FormCard>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    fontWeight="medium"
                >
                    {isLogin ? 'Log In' : 'Sign Up'}
                </Typography>
                {isLogin ? (
                    <Login onSwitchToSignUp={() => setIsLogin(false)} />
                ) : (
                    <Signup onSwitchToLogin={() => setIsLogin(true)} />
                )}
            </FormCard>
        </PageContainer>
    );
};
