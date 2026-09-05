import { Tooltip as MuiTooltip, TooltipProps, useTheme } from '@mui/material';

export const Tooltip = (props: TooltipProps) => {
    const theme = useTheme();
    return (
        <MuiTooltip
            enterDelay={1000}
            slotProps={{
                tooltip: {
                    sx: {
                        borderRadius: theme.typography.pxToRem(10),
                    },
                },
            }}
            {...props}
        />
    );
};
