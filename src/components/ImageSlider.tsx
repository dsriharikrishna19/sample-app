import React, { useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

interface ImageSliderProps {
    images: string[];
    height: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, height }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (event: any) => {
        const x = event.nativeEvent.locationX;
        if (x < width / 2) {
            setActiveIndex((prev) => Math.max(0, prev - 1));
        } else {
            setActiveIndex((prev) => Math.min(images.length - 1, prev + 1));
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={handlePress}
            style={[styles.container, { height }]}
        >
            <Image source={{ uri: images[activeIndex] }} style={styles.image} />

            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { width: (width * 0.9 - 40) / images.length - 5 },
                            index === activeIndex ? styles.activeDot : null,
                        ]}
                    />
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.background.card,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        gap: 5,
    },
    dot: {
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 2,
    },
    activeDot: {
        backgroundColor: '#FFF',
    },
});

export default ImageSlider;
