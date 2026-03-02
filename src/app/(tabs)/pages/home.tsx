import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity as RNTouchableOpacity,
    Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import { MOCK_USERS } from '../../../utils/mockData';
import Card from '../../../components/Card';
import AppText from '../../../components/AppText';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { useResponsive } from '../../../hooks/useResponsive';
import { RotateCcw, X, Heart, Settings, MessageCircle } from 'lucide-react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const TouchableOpacity = RNTouchableOpacity;

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const { width, height, isTablet, scale } = useResponsive();
    const [index, setIndex] = useState(0);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const SWIPE_THRESHOLD = width * 0.3;

    const filteredUsers = useMemo(() => {
        if (!user) return MOCK_USERS;
        return MOCK_USERS.filter(u => {
            if (user.gender === 'male') return u.gender === 'female';
            if (user.gender === 'female') return u.gender === 'male';
            return true;
        });
    }, [user]);

    const currentUser = useMemo(() => filteredUsers[index % filteredUsers.length], [index, filteredUsers]);
    const nextUser = useMemo(() => filteredUsers[(index + 1) % filteredUsers.length], [index, filteredUsers]);

    const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
        translateX.value = 0;
        translateY.value = 0;
        setIndex((prev) => prev + 1);
    }, [translateX, translateY]);

    const resetIndex = () => {
        setIndex(0);
        translateX.value = 0;
        translateY.value = 0;
    };

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
                    { damping: 15, stiffness: 100 },
                    () => runOnJS(onSwipeComplete)(direction)
                );
            } else {
                translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
                translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
            }
        }), [onSwipeComplete, translateX, translateY, width, SWIPE_THRESHOLD]);

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-width / 2, 0, width / 2],
            [-8, 0, 8],
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

    const likeOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, width / 4], [0, 1], Extrapolation.CLAMP),
    }));

    const nopeOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value, [0, -width / 4], [0, 1], Extrapolation.CLAMP),
    }));

    const nextCardStyle = useAnimatedStyle(() => {
        const scaleVal = interpolate(
            Math.abs(translateX.value),
            [0, width / 2],
            [0.92, 1],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            Math.abs(translateX.value),
            [0, width / 2],
            [0.6, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale: scaleVal }],
            opacity,
        };
    });

    const handlePressSwipe = useCallback((direction: 'left' | 'right') => {
        translateX.value = withSpring(
            direction === 'right' ? width * 1.5 : -width * 1.5,
            { damping: 15, stiffness: 100 },
            () => runOnJS(onSwipeComplete)(direction)
        );
    }, [onSwipeComplete, translateX, width]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerIcon} />
                <AppText variant="h2" color={COLORS.primary} style={styles.logo}>
                    sample
                </AppText>
                <View style={styles.headerIcon} />
            </View>

            <View style={styles.cardContainer}>
                {index < filteredUsers.length ? (
                    <>
                        {index + 1 < filteredUsers.length && (
                            <Animated.View style={[styles.nextCard, nextCardStyle]}>
                                <Card user={nextUser} />
                            </Animated.View>
                        )}

                        <GestureDetector gesture={gesture}>
                            <Animated.View style={[styles.activeCard, animatedStyle]}>
                                <Card user={currentUser} />

                                <Animated.View style={[styles.overlayWrapper, styles.likeOverlay, likeOpacity]}>
                                    <AppText variant="h1" style={styles.overlayText}>LIKE</AppText>
                                </Animated.View>

                                <Animated.View style={[styles.overlayWrapper, styles.nopeOverlay, nopeOpacity]}>
                                    <AppText variant="h1" style={styles.overlayText}>NOPE</AppText>
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconCircle}>
                            <RotateCcw color={COLORS.primary} size={40} />
                        </View>
                        <AppText variant="h2" align="center" style={styles.emptyTitle}>No more matches!</AppText>
                        <AppText variant="body" align="center" color={COLORS.text.secondary} style={styles.emptySubtitle}>
                            You've seen everyone nearby. Try changing your filters or check back later.
                        </AppText>
                        <RNTouchableOpacity
                            style={styles.refreshButton}
                            onPress={resetIndex}
                        >
                            <AppText variant="bodyBold" color={COLORS.text.light}>Refresh List</AppText>
                        </RNTouchableOpacity>
                    </View>
                )}
            </View>

            <View style={[styles.footer, isTablet && styles.tabletFooter]}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.undoButton]}
                    onPress={() => setIndex((prev) => Math.max(0, prev - 1))}
                    activeOpacity={0.7}
                >
                    <RotateCcw color={COLORS.warning} size={22} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.dislikeButton]}
                    onPress={() => handlePressSwipe('left')}
                    activeOpacity={0.7}
                >
                    <X color={COLORS.error} size={32} strokeWidth={3} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.likeButton]}
                    onPress={() => handlePressSwipe('right')}
                    activeOpacity={0.7}
                >
                    <Heart color={COLORS.accent} size={32} fill={COLORS.accent} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.chatButton]}
                    onPress={() => router.push('/pages/chat')}
                    activeOpacity={0.7}
                >
                    <MessageCircle color={COLORS.primary} size={24} />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
    },
    headerIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontWeight: '900',
        letterSpacing: -1,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.md,
    },
    nextCard: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
    },
    activeCard: {
        width: '100%',
        alignItems: 'center',
        zIndex: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.lg,
        paddingBottom: Platform.OS === 'ios' ? SPACING.xxl : SPACING.xl,
        paddingTop: SPACING.md,
    },
    tabletFooter: {
        paddingBottom: SPACING.xxl,
    },
    actionButton: {
        backgroundColor: COLORS.background.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RADIUS.full,
        elevation: 5,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    undoButton: {
        width: 48,
        height: 48,
        borderColor: COLORS.warning,
        borderWidth: 1.5,
    },
    dislikeButton: {
        width: 64,
        height: 64,
        borderColor: COLORS.error,
        borderWidth: 1.5,
    },
    likeButton: {
        width: 64,
        height: 64,
        borderColor: COLORS.accent,
        borderWidth: 1.5,
    },
    chatButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.background.card,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },
    overlayWrapper: {
        position: 'absolute',
        top: 50,
        borderWidth: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        zIndex: 10,
    },
    likeOverlay: {
        left: 30,
        borderColor: COLORS.accent,
        transform: [{ rotate: '-15deg' }],
    },
    nopeOverlay: {
        right: 30,
        borderColor: COLORS.error,
        transform: [{ rotate: '15deg' }],
    },
    overlayText: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: 2,
        color: 'inherit' as any, // Will be overridden by container border color if needed
    },
    emptyContainer: {
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primaryAlpha(0.1),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    emptyTitle: {
        marginBottom: SPACING.xs,
    },
    emptySubtitle: {
        marginBottom: SPACING.xl,
        paddingHorizontal: SPACING.xl,
    },
    refreshButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: RADIUS.full,
        elevation: 3,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});
