import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';

interface Option {
    label: string;
    value: string;
    icon?: string;
}

interface SelectionGroupProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: Option[];
    type?: 'radio' | 'card';
}

const SelectionGroup = <T extends FieldValues>({
    control,
    name,
    label,
    options,
    type = 'radio'
}: SelectionGroupProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    {label && <Text style={styles.label}>{label}</Text>}
                    <View style={type === 'card' ? styles.cardContainer : styles.radioContainer}>
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        type === 'card' ? styles.card : styles.radioItem,
                                        isSelected ? styles.selectedItem : null,
                                        error ? styles.errorBorder : null
                                    ]}
                                    onPress={() => onChange(option.value)}
                                    activeOpacity={0.7}
                                >
                                    {option.icon && <Text style={styles.icon}>{option.icon}</Text>}
                                    <Text style={[
                                        styles.itemText,
                                        isSelected ? styles.selectedItemText : null
                                    ]}>
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {error && <Text style={styles.errorText}>{error.message}</Text>}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
    },
    radioContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    cardContainer: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    radioItem: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background.card,
    },
    card: {
        flex: 1,
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        borderWidth: 2,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedItem: {
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}10`, // 10% opacity
    },
    icon: {
        fontSize: 24,
        marginBottom: SPACING.xs,
    },
    itemText: {
        fontSize: 14,
        color: COLORS.text.primary,
        fontWeight: '500',
    },
    selectedItemText: {
        color: COLORS.primary,
        fontWeight: 'bold',
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

export default SelectionGroup;
