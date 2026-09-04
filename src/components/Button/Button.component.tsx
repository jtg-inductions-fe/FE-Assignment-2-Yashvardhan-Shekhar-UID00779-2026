import { Button as MuiButton, ButtonProps } from '@mui/material';

export const Button = (props: ButtonProps) => {
    const isSmall = props.size === 'small';

    return (
        <MuiButton
            sx={{
                py: isSmall ? 2 : 4,
                px: isSmall ? 4 : 8,
            }}
            {...props}
        />
    );
};
