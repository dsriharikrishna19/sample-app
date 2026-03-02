import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const TYPOGRAPHY = {
    family: {
        regular: 'System', // Replace with custom fonts if needed
        medium: 'System',
        bold: 'System',
        heavy: 'System',
    },
    size: {
        xxs: 10,
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
        huge: 40,
    },
    weight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        heavy: '800',
        black: '900',
    },
    lineHeight: {
        tight: 1.2,
        snug: 1.3,
        normal: 1.5,
        relaxed: 1.6,
    }
} as const;

export const TEXT_STYLES = StyleSheet.create({
    h1: {
        fontSize: TYPOGRAPHY.size.xxxl,
        fontWeight: TYPOGRAPHY.weight.heavy,
        color: COLORS.text.primary,
        letterSpacing: -0.5,
    },
    h2: {
        fontSize: TYPOGRAPHY.size.xxl,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: COLORS.text.primary,
        letterSpacing: -0.5,
    },
    h3: {
        fontSize: TYPOGRAPHY.size.xl,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: COLORS.text.primary,
    },
    body: {
        fontSize: TYPOGRAPHY.size.base,
        fontWeight: TYPOGRAPHY.weight.regular,
        color: COLORS.text.secondary,
        lineHeight: TYPOGRAPHY.size.base * TYPOGRAPHY.lineHeight.normal,
    },
    bodyBold: {
        fontSize: TYPOGRAPHY.size.base,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: COLORS.text.primary,
    },
    caption: {
        fontSize: TYPOGRAPHY.size.xs,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: COLORS.text.tertiary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    link: {
        fontSize: TYPOGRAPHY.size.base,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: COLORS.primary,
    },
    small: {
        fontSize: TYPOGRAPHY.size.xs,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: COLORS.text.secondary,
    },
    tiny: {
        fontSize: TYPOGRAPHY.size.xxs,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: COLORS.text.tertiary,
    }
});
