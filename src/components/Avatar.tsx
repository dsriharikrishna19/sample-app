import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { COLORS } from '../theme/colors';

interface AvatarProps {
    uri: string | undefined;
    size?: number;
    showOnline?: boolean;
    style?: ViewStyle;
    imageStyle?: ImageStyle;
}

export default function Avatar({
    uri,
    size = 50,
    showOnline = false,
    style,
    imageStyle
}: AvatarProps) {
    const defaultImage = 'https://ui-avatars.com/api/?name=User&background=random';

    return (
        <View style={[styles.container, style, { width: size, height: size }]}>
            <Image
                source={{ uri: uri || defaultImage }}
                style={[
                    styles.image,
                    { width: size, height: size, borderRadius: size / 2 },
                    imageStyle
                ]}
            />
            {showOnline && (
                <View
                    style={[
                        styles.onlineDot,
                        {
                            width: size * 0.25,
                            height: size * 0.25,
                            borderRadius: (size * 0.25) / 2,
                            bottom: size * 0.05,
                            right: size * 0.05,
                            borderWidth: size * 0.05
                        }
                    ]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        backgroundColor: COLORS.background.surface,
    },
    onlineDot: {
        position: 'absolute',
        backgroundColor: '#4ade80', // Tailwind green-400
        borderColor: COLORS.background.main,
    },
});
