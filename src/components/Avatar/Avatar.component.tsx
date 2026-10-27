import { Avatar as MuiAvatar, useTheme } from '@mui/material';

import { Props } from './Avatar.types';

export const Avatar = (props: Props) => {
    const { name } = props;
    const theme = useTheme();

    return (
        <MuiAvatar
            sx={{
                width: theme.typography.pxToRem(32),
                height: theme.typography.pxToRem(32),
                backgroundColor: theme.palette.primary.main,
            }}
            alt={name.toUpperCase()}
            src={name}
        />
    );
};
