import { ReactElement } from 'react';

import { TooltipProps as MuiToolTipProps } from '@mui/material';

export type TooltipProps = MuiToolTipProps & {
    children: ReactElement;
    mustShow?: boolean;
};
