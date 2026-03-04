import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY, TEXT_STYLES } from '../theme/typography';
import { useTheme } from '../hooks/useTheme';

interface AppTextProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'link' | 'small' | 'tiny';
    color?: string;
    align?: 'left' | 'center' | 'right';
    weight?: keyof typeof TYPOGRAPHY.weight;
}

const AppText: React.FC<AppTextProps> = ({
    variant = 'body',
    color,
    align,
    weight,
    style,
    children,
    ...props
}) => {
    const theme = useTheme();
    const textStyle = TEXT_STYLES[variant];

    return (
        <RNText
            style={[
                textStyle,
                { color: color || theme.text.primary },
                align ? { textAlign: align } : null,
                weight ? { fontWeight: TYPOGRAPHY.weight[weight] } : null,
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

export default AppText;
