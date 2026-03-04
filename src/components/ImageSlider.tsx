import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    cancelAnimation,
    runOnJS,
    SharedValue
} from 'react-native-reanimated';
import { COLORS as STATIC_COLORS } from '../theme/colors';
import { RADIUS } from '../theme/spacing';
import { useTheme } from '../hooks/useTheme';

interface ImageSliderProps {
    images: string[];
    height: number;
}

const TRANSITION_DURATION = 400; // Duration of the cross-fade in ms
const STORY_DURATION = 5000;    // Duration each image stays in ms

const ImageSlider: React.FC<ImageSliderProps> = ({ images, height }) => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const fadeOpacity = useSharedValue(1);
    const progress = useSharedValue(0);

    // Use a ref to track the active index for the animation callback to avoid closure issues
    const activeIndexRef = useRef(0);
    activeIndexRef.current = activeIndex;

    const startProgress = useCallback(() => {
        progress.value = 0;
        progress.value = withTiming(1, {
            duration: STORY_DURATION,
            easing: Easing.linear,
        }, (finished) => {
            if (finished) {
                runOnJS(handleAutoNext)();
            }
        });
    }, [progress]);

    const handleAutoNext = () => {
        if (activeIndexRef.current < images.length - 1) {
            changeImage(activeIndexRef.current + 1);
        } else {
            // Loop back to start or stay? Usually stories stay at last or loop.
            // Let's loop back to index 0 for a continuous experience
            changeImage(0);
        }
    };

    const changeImage = (newIndex: number) => {
        if (newIndex === activeIndex) return;

        cancelAnimation(progress);
        setPrevIndex(activeIndex);
        setActiveIndex(newIndex);

        // Trigger cross-fade animation
        fadeOpacity.value = 0;
        fadeOpacity.value = withTiming(1, {
            duration: TRANSITION_DURATION,
            easing: Easing.out(Easing.quad),
        });

        // Restart story progress
        startProgress();
    };

    const nextImage = () => {
        if (activeIndex < images.length - 1) {
            changeImage(activeIndex + 1);
        } else {
            changeImage(0); // Loop
        }
    };

    const prevImage = () => {
        if (activeIndex > 0) {
            changeImage(activeIndex - 1);
        } else {
            changeImage(images.length - 1); // Loop backwards
        }
    };

    useEffect(() => {
        startProgress();
        return () => cancelAnimation(progress);
    }, [startProgress]);

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: fadeOpacity.value,
    }));

    if (!images || images.length === 0) {
        return (
            <View style={[styles.container, { height, backgroundColor: theme.background.surface }]}>
                <View style={[styles.placeholder, { backgroundColor: theme.background.surface }]} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { height, backgroundColor: theme.background.surface }]}>
            {/* Background Image (Previous) */}
            {prevIndex !== null && (
                <Image
                    source={{ uri: images[prevIndex] }}
                    style={[StyleSheet.absoluteFill, styles.image]}
                />
            )}

            {/* Foreground Image (Current) */}
            <Animated.Image
                source={{ uri: images[activeIndex] || 'https://via.placeholder.com/400x600?text=No+Photo' }}
                style={[styles.image, fadeStyle]}
            />

            {/* Pagination indicators with progress filling */}
            {images.length > 1 && (
                <View style={styles.pagination}>
                    {images.map((_, index) => (
                        <ProgressBar
                            key={index}
                            isActive={index === activeIndex}
                            isCompleted={index < activeIndex}
                            progress={progress}
                            theme={theme}
                        />
                    ))}
                </View>
            )}

            {/* Invisible touchable areas */}
            <View style={styles.touchOverlay}>
                <Pressable style={styles.touchArea} onPress={prevImage} />
                <Pressable style={styles.touchArea} onPress={nextImage} />
            </View>
        </View>
    );
};

// Sub-component for individual progress segment
const ProgressBar = ({ isActive, isCompleted, progress, theme }: {
    isActive: boolean;
    isCompleted: boolean;
    progress: SharedValue<number>;
    theme: any;
}) => {
    const fillStyle = useAnimatedStyle(() => {
        if (isCompleted) return { width: '100%' };
        if (!isActive) return { width: '0%' };
        return {
            width: `${progress.value * 100}%`
        };
    });

    return (
        <View style={[styles.barContainer, { backgroundColor: 'rgba(255, 255, 255, 0.25)' }]}>
            <Animated.View style={[styles.barFill, fillStyle]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: RADIUS.xxl,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.background.surface,
    },
    pagination: {
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        flexDirection: 'row',
        gap: 6,
        zIndex: 10,
    },
    barContainer: {
        flex: 1,
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#FFF',
    },
    touchOverlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        zIndex: 5,
    },
    touchArea: {
        flex: 1,
        height: '100%',
    },
});

export default ImageSlider;
