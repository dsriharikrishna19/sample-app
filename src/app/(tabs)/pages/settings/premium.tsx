import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { X, Star, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AppText from '../../../../components/AppText';
import { COLORS } from '../../../../theme/colors';
import { SPACING, RADIUS } from '../../../../theme/spacing';
import { TYPOGRAPHY } from '../../../../theme/typography';

export default function PremiumScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
                <View style={styles.card}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                        <X color={COLORS.text.light} size={24} />
                    </TouchableOpacity>

                    <Star color={COLORS.warning} size={64} fill={COLORS.warning} style={{ marginBottom: SPACING.lg }} />
                    <AppText variant="h1" color={COLORS.text.light} style={styles.title}>Tinder Gold</AppText>
                    <AppText variant="body" align="center" color={COLORS.text.light} style={styles.subtitle}>
                        Unlock exclusive features and find matches faster. Take control of your dating experience.
                    </AppText>

                    <View style={styles.featuresContainer}>
                        <View style={styles.featureItem}>
                            <View style={styles.iconCircle}>
                                <Check color={COLORS.warning} size={16} strokeWidth={3} />
                            </View>
                            <View style={styles.featureText}>
                                <AppText variant="bodyBold" color={COLORS.text.light}>See Who Likes You</AppText>
                                <AppText variant="small" color={COLORS.text.tertiary}>Match with them instantly</AppText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <View style={styles.iconCircle}>
                                <Check color={COLORS.warning} size={16} strokeWidth={3} />
                            </View>
                            <View style={styles.featureText}>
                                <AppText variant="bodyBold" color={COLORS.text.light}>Unlimited Swipes</AppText>
                                <AppText variant="small" color={COLORS.text.tertiary}>Never run out of potential matches</AppText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <View style={styles.iconCircle}>
                                <Check color={COLORS.warning} size={16} strokeWidth={3} />
                            </View>
                            <View style={styles.featureText}>
                                <AppText variant="bodyBold" color={COLORS.text.light}>Ad-free Experience</AppText>
                                <AppText variant="small" color={COLORS.text.tertiary}>Swipe without interruptions</AppText>
                            </View>
                        </View>

                        <View style={styles.featureItem}>
                            <View style={styles.iconCircle}>
                                <Check color={COLORS.warning} size={16} strokeWidth={3} />
                            </View>
                            <View style={styles.featureText}>
                                <AppText variant="bodyBold" color={COLORS.text.light}>5 Super Likes a week</AppText>
                                <AppText variant="small" color={COLORS.text.tertiary}>Stand out from the crowd</AppText>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.subscribeButton} onPress={() => router.back()}>
                        <AppText variant="bodyBold" color={COLORS.text.primary} style={{ fontSize: 16 }}>Subscribe Now</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
                        <AppText variant="small" color={COLORS.text.tertiary} align="center">No Thanks</AppText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.dark,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.background.dark,
        alignItems: 'center',
        paddingTop: SPACING.xl,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: SPACING.sm,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: RADIUS.full,
        zIndex: 10,
    },
    title: {
        marginBottom: SPACING.sm,
    },
    subtitle: {
        opacity: 0.8,
        marginBottom: SPACING.xxl,
        paddingHorizontal: SPACING.lg,
    },
    featuresContainer: {
        width: '100%',
        marginBottom: SPACING.xxxl,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.md,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,187,0, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    featureText: {
        flex: 1,
    },
    subscribeButton: {
        backgroundColor: COLORS.warning,
        width: '100%',
        paddingVertical: 16,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        marginBottom: SPACING.md,
        shadowColor: COLORS.warning,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    secondaryButton: {
        paddingVertical: SPACING.sm,
    }
});
