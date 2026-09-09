import {
    cloneElement,
    isValidElement,
    ReactElement,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { Tooltip as MuiTooltip, useTheme } from '@mui/material';

import { TooltipProps } from './Tooltip.types';

export const Tooltip = (props: TooltipProps) => {
    const { mustShow, ...rest } = props;
    const children = props.children as ReactElement;
    const theme = useTheme();
    const ref = useRef<HTMLElement>(null);
    const [isClamped, setIsClamped] = useState(true);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const isOverflowing =
            element.scrollWidth > element.clientWidth ||
            element.scrollHeight > element.clientHeight;
        setIsClamped(isOverflowing);
    }, []);

    if (mustShow) {
        return mustShow ? (
            <MuiTooltip
                enterDelay={1000}
                slotProps={{
                    tooltip: {
                        sx: { borderRadius: theme.typography.pxToRem(10) },
                    },
                }}
                {...rest}
            >
                {children}
            </MuiTooltip>
        ) : (
            children
        );
    }

    return isClamped && isValidElement(children) ? (
        <MuiTooltip
            enterDelay={1000}
            slotProps={{
                tooltip: {
                    sx: { borderRadius: theme.typography.pxToRem(10) },
                },
            }}
            {...rest}
        >
            {cloneElement(children, { ref: ref })}
        </MuiTooltip>
    ) : (
        children
    );
};
