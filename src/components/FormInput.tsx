import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Input from './Input';
import { TextInputProps } from 'react-native';

interface FormInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    required?: boolean;
    placeholder?: string;
    isNumber?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const FormInput = <T extends FieldValues>({
    control,
    name,
    label,
    required,
    isNumber,
    ...props
}: FormInputProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                    label={label}
                    required={required}
                    onBlur={onBlur}
                    onChangeText={(val) => {
                        if (isNumber) {
                            onChange(val ? Number(val) : 0);
                        } else {
                            onChange(val);
                        }
                    }}
                    value={String(value || '')}
                    error={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export default FormInput;
