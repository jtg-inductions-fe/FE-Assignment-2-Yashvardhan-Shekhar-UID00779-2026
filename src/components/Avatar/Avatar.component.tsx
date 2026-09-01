import { Avatar, useTheme } from '@mui/material';

import { Props } from './Avatar.types';

export const StyledAvatar = (props: Props) => {
    const { name } = props;
    const theme = useTheme();

    return (
        <Avatar
            sx={{
                width: theme.typography.pxToRem(32),
                height: theme.typography.pxToRem(32),
                backgroundColor: theme.palette.primary.main,
            }}
            alt={name}
            src="blank.jpg"
        />
    );
};
