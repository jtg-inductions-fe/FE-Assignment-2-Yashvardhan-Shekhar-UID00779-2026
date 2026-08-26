import { Box, styled } from '@mui/material';

// Outer wrapper viewport container
export const PageContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    minHeight: 650,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: theme.spacing(6),
        padding: theme.spacing(6),
        justifyContent: 'center',
    },
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

// Left column layout wrapper
export const BrandingColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    maxWidth: 500,
    objectFit: 'contain',
    maxHeight: 0,
    [theme.breakpoints.up('md')]: {
        maxHeight: 'none',
    },
}));

// Text alignment layout wrapper
export const HeaderTextWrapper = styled(Box)({
    textAlign: 'center',
});

// Structural illustration wrapper
export const OnboardingImage = styled(Box)<{
    component: 'img';
    img: 'string';
    alt: 'string';
}>({
    width: '100%',
    maxHeight: 400,
    objectFit: 'contain',
    aspectRatio: '1/1',
});

// Right column form card layout
export const FormCard = styled(Box)(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius * 2.5,
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: 400,

    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));
