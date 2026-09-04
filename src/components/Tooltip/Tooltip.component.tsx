import { Tooltip as MuiTooltip, TooltipProps, useTheme } from '@mui/material';

export const Tooltip = (props: TooltipProps) => {
    const theme = useTheme();
    return (
        <MuiTooltip
            {...props}
            enterDelay={1000}
            slotProps={{
                tooltip: {
                    sx: {
                        borderRadius: theme.typography.pxToRem(10),
                    },
                },
            }}
        />
    );
};
