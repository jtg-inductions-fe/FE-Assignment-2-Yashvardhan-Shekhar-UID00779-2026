import { Controller, useFormContext } from 'react-hook-form';

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';

import { TextFieldProps } from './RadioField.types';

export const RadioField = (allProps: TextFieldProps) => {
    const { fieldName, heading, options } = allProps;

    const {
        formState: { errors },
        control,
    } = useFormContext();

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
                <FormControl component="fieldset" error={!!errors.role}>
                    <FormLabel id="role-radio-group-label">{heading}</FormLabel>
                    <RadioGroup
                        {...field}
                        aria-labelledby="role-radio-group-label"
                        row
                    >
                        {options.map((option) => (
                            <FormControlLabel
                                key={option}
                                value={option}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
};
