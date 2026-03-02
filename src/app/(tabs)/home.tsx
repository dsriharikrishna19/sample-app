import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity as RNTouchableOpacity
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { MOCK_USERS } from '../../utils/mockData';
import Card from '../../components/Card';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { RotateCcw, X, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

const TouchableOpacity = RNTouchableOpacity;

export default function HomeScreen() {
    const [index, setIndex] = useState(0);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const currentUser = useMemo(() => MOCK_USERS[index % MOCK_USERS.length], [index]);
    const nextUser = useMemo(() => MOCK_USERS[(index + 1) % MOCK_USERS.length], [index]);

    const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
        console.log('Swiped', direction);
        translateX.value = 0;
        translateY.value = 0;
        setIndex((prev) => prev + 1);
    }, [translateX, translateY]);

    const gesture = useMemo(() => Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd((event) => {
            if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
                const direction = event.translationX > 0 ? 'right' : 'left';
                translateX.value = withSpring(
                    event.translationX > 0 ? width * 1.5 : -width * 1.5,
                    {},
                    () => runOnJS(onSwipeComplete)(direction)
                );
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        }), [onSwipeComplete, translateX, translateY]);

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-width / 2, 0, width / 2],
            [-10, 0, 10],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotate}deg` },
            ],
        };
    });

    const nextCardStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            [-width / 2, 0, width / 2],
            [1, 0.9, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity: interpolate(
                translateX.value,
                [-width / 2, 0, width / 2],
                [1, 0.5, 1],
                Extrapolation.CLAMP
            ),
        };
    });

    const handlePressSwipe = useCallback((direction: 'left' | 'right') => {
        translateX.value = withSpring(
            direction === 'right' ? width * 1.5 : -width * 1.5,
            {},
            () => runOnJS(onSwipeComplete)(direction)
        );
    }, [onSwipeComplete, translateX]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.nextCard, nextCardStyle]}>
                    <Card user={nextUser} />
                </Animated.View>

                <GestureDetector gesture={gesture}>
                    <Animated.View style={[styles.activeCard, animatedStyle]}>
                        <Card user={currentUser} />
                    </Animated.View>
                </GestureDetector>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.dislikeButton]}
                    onPress={() => handlePressSwipe('left')}
                >
                    <X {...({ stroke: COLORS.error, size: 30, strokeWidth: 3 } as any)} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.undoButton]}
                    onPress={() => setIndex((prev) => Math.max(0, prev - 1))}
                >
                    <RotateCcw {...({ stroke: COLORS.secondary, size: 24 } as any)} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.likeButton]}
                    onPress={() => handlePressSwipe('right')}
                >
                    <Heart {...({ stroke: COLORS.accent, size: 30, fill: COLORS.accent } as any)} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACING.md,
    },
    nextCard: {
        position: 'absolute',
        top: SPACING.md,
        zIndex: 1,
    },
    activeCard: {
        zIndex: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    },
    actionButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.background.card,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    dislikeButton: {
        borderColor: COLORS.error,
        borderWidth: 1,
    },
    likeButton: {
        borderColor: COLORS.accent,
        borderWidth: 1,
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    undoButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});
