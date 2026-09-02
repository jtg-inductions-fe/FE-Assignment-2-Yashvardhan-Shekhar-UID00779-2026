import { Box, BoxProps, styled } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    minHeight: theme.typography.pxToRem(650),
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

export const BrandingColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    maxWidth: theme.typography.pxToRem(500),
}));

export const OnboardingImage = styled(Box)<BoxProps<'img'>>(({ theme }) => ({
    width: '100%',
    maxHeight: theme.typography.pxToRem(400),
    objectFit: 'contain',
    aspectRatio: '1/1',
}));

export const FormCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: theme.typography.pxToRem(400),

    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));
