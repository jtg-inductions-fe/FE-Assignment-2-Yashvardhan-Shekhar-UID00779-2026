import { Button as MuiButton } from '@mui/material';

import { StyledAddButton } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = (props: ButtonProps) => {
    const { isAddButton = false, ...rest } = props;
    const isSmall = rest.size === 'small';

    return isAddButton ? (
        <StyledAddButton {...rest} />
    ) : (
        <MuiButton
            sx={{
                py: isSmall ? 2 : 4,
                px: isSmall ? 4 : 8,
            }}
            {...rest}
        />
    );
};
