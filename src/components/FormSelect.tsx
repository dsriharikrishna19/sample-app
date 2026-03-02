import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';

interface FormSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: string[] | { label: string; value: string }[];
}

const FormSelect = <T extends FieldValues>({
    control,
    name,
    label,
    options
}: FormSelectProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <Text style={styles.label}>{label}</Text>}
                    <View style={[styles.pickerContainer, error ? styles.errorBorder : null]}>
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={styles.picker}
                            dropdownIconColor={COLORS.primary}
                        >
                            <Picker.Item label={`Select ${label}...`} value="" color={COLORS.text.secondary} />
                            {options.map((option) => {
                                const labelText = typeof option === 'string' ? option : option.label;
                                const valueText = typeof option === 'string' ? option : option.value;
                                return (
                                    <Picker.Item
                                        key={valueText}
                                        label={labelText}
                                        value={valueText}
                                        color={COLORS.text.primary}
                                    />
                                );
                            })}
                        </Picker>
                    </View>
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    pickerContainer: {
        backgroundColor: COLORS.background.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        overflow: 'hidden',
        minHeight: 48,
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: 48,
        color: COLORS.text.primary,
    },
    errorBorder: {
        borderColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 4,
    },
});

export default FormSelect;
