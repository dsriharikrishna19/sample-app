import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ViewStyle,
    TextInputProps,
    Animated,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { SPACING, RADIUS } from '../theme/spacing';
import { TYPOGRAPHY } from '../theme/typography';
import AppText from './AppText';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    leftIcon,
    rightIcon,
    onFocus,
    onBlur,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <AppText variant="caption" style={styles.label}>
                    {label}
                </AppText>
            )}
            <View
                style={[
                    styles.inputContainer,
                    isFocused && styles.inputFocused,
                    error ? styles.inputError : null,
                    props.multiline && styles.multilineContainer,
                ]}
            >
                {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        props.multiline && styles.multilineInput,
                    ]}
                    placeholderTextColor={COLORS.text.tertiary}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </View>
            {error && (
                <AppText variant="caption" color={COLORS.error} style={styles.errorText}>
                    {error}
                </AppText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.base,
        width: '100%',
    },
    label: {
        marginBottom: SPACING.xs,
        color: COLORS.text.secondary,
        marginLeft: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.card,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        minHeight: 52,
    },
    inputFocused: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.background.card,
        // Optional shadow for focused state
        elevation: 1,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    input: {
        flex: 1,
        fontSize: TYPOGRAPHY.size.base,
        color: COLORS.text.primary,
        paddingVertical: SPACING.sm,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    multilineContainer: {
        alignItems: 'flex-start',
        minHeight: 120,
        paddingVertical: SPACING.sm,
    },
    multilineInput: {
        textAlignVertical: 'top',
        height: '100%',
    },
    iconLeft: {
        marginRight: SPACING.sm,
    },
    iconRight: {
        marginLeft: SPACING.sm,
    },
    errorText: {
        marginTop: 4,
        marginLeft: SPACING.xs,
        textTransform: 'none',
    },
});

export default Input;
