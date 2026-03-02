import React, { useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingFormData } from '../../schemas/onboardingSchema';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import SelectionGroup from '../../components/SelectionGroup';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import { COLORS } from '../../theme/colors';
import { SPACING, RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { useResponsive } from '../../hooks/useResponsive';
import { Camera, ArrowLeft, ChevronRight } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const registrationMobile = useSelector((state: RootState) => state.auth.registrationMobile);
    const [step, setStep] = useState(1);
    const { isTablet, scale } = useResponsive();

    const { control, handleSubmit, formState: { errors } } = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            fullName: '',
            mobile: registrationMobile || '',
            age: 18,
            gender: 'male',
            height: 170,
            city: '',
            state: '',
            country: 'India',
            bio: '',
            zodiacSign: 'Aries',
            relationshipType: 'Serious',
            datingIntent: 'Long-term',
            interests: ['Travel'],
            images: [
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800'
            ]
        }
    });

    const onSubmit = (data: OnboardingFormData) => {
        console.log('Onboarding Data:', data);
        router.replace('/pages/home');
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.formSection}>
                        <AppText variant="h1" style={styles.sectionTitle}>The Basics</AppText>
                        <AppText variant="body" style={styles.sectionSubtitle}>Tell us the basics to get started.</AppText>

                        <FormInput control={control} name="fullName" label="Full Name" placeholder="Rahul Sharma" />
                        <FormInput control={control} name="mobile" label="Mobile Number" placeholder="9876543210" keyboardType="numeric" maxLength={10} />

                        <View style={styles.row}>
                            <View style={styles.half}>
                                <FormInput control={control} name="age" label="Age" keyboardType="numeric" isNumber maxLength={2} />
                            </View>
                            <View style={styles.half}>
                                <FormInput control={control} name="height" label="Height (cm)" keyboardType="numeric" isNumber maxLength={3} />
                            </View>
                        </View>

                        <FormSelect
                            control={control}
                            name="gender"
                            label="Gender Identity"
                            options={["male", "female", "other", "prefer_not_to_say"]}
                        />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.formSection}>
                        <AppText variant="h1" style={styles.sectionTitle}>About You</AppText>
                        <AppText variant="body" style={styles.sectionSubtitle}>Share a bit of your personality.</AppText>

                        <FormInput
                            control={control}
                            name="bio"
                            label="Bio"
                            placeholder="Tell us something interesting..."
                            multiline
                            numberOfLines={4}
                        />

                        <FormSelect
                            control={control}
                            name="zodiacSign"
                            label="Zodiac Sign"
                            options={[
                                "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
                                "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
                            ]}
                        />

                        <SelectionGroup
                            control={control}
                            name="relationshipType"
                            label="What are you looking for?"
                            options={[
                                { label: 'Serious ❤️', value: 'Serious' },
                                { label: 'Casual 😎', value: 'Casual' },
                                { label: 'Marriage 💍', value: 'Marriage' },
                                { label: 'Friendship 🤝', value: 'Friendship' }
                            ]}
                        />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.formSection}>
                        <AppText variant="h1" style={styles.sectionTitle}>Preferences</AppText>
                        <AppText variant="body" style={styles.sectionSubtitle}>Fine-tune your discovery.</AppText>

                        <SelectionGroup
                            control={control}
                            name="datingIntent"
                            label="Dating Intent"
                            type="card"
                            options={[
                                { label: 'Long-term', value: 'Long-term', icon: '💖' },
                                { label: 'Short-term', value: 'Short-term', icon: '🔥' }
                            ]}
                        />

                        <FormInput control={control} name="email" label="Email (Optional)" placeholder="rahul@example.com" keyboardType="email-address" autoCapitalize="none" />

                        <View style={styles.locationContainer}>
                            <AppText variant="caption" style={styles.locationLabel}>Location</AppText>
                            <FormInput control={control} name="city" label="City" placeholder="City (e.g. Hyderabad)" />
                            <View style={styles.row}>
                                <View style={styles.half}>
                                    <FormInput control={control} name="state" label="State" placeholder="State" />
                                </View>
                                <View style={styles.half}>
                                    <FormInput control={control} name="country" label="Country" placeholder="Country" />
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 4:
                return (
                    <View style={styles.formSection}>
                        <AppText variant="h1" style={styles.sectionTitle}>Show Yourself</AppText>
                        <AppText variant="body" style={styles.sectionSubtitle}>Upload 4 photos to complete your profile.</AppText>

                        <View style={styles.imageGrid}>
                            {[0, 1, 2, 3].map((idx) => (
                                <TouchableOpacity key={idx} style={styles.imagePlaceholder} activeOpacity={0.7}>
                                    <View style={styles.imageIconCircle}>
                                        <Camera color={COLORS.primary} size={24} />
                                    </View>
                                    <AppText variant="caption" color={COLORS.text.tertiary} style={styles.imageLabel}>
                                        PHOTO {idx + 1}
                                    </AppText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.infoBox}>
                            <AppText variant="body" color={COLORS.primary} align="center" style={styles.infoText}>
                                💡 Tip: Clear, smiling photos get 60% more matches!
                            </AppText>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={step > 1 ? prevStep : () => router.back()} style={styles.backButton}>
                        <ArrowLeft color={COLORS.text.primary} size={24} />
                    </TouchableOpacity>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${(step / 4) * 100}%` }]} />
                        </View>
                        <AppText variant="caption" style={styles.stepText}>STEP {step} OF 4</AppText>
                    </View>
                    <View style={styles.headerRight} />
                </View>

                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        isTablet && styles.tabletScrollContent
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[styles.contentContainer, isTablet && styles.tabletContent]}>
                        {renderStepContent()}
                    </View>
                </ScrollView>

                <View style={[styles.footer, isTablet && styles.tabletFooter]}>
                    <Button
                        title={step === 4 ? "Complete Profile" : "Continue"}
                        onPress={step === 4 ? handleSubmit(onSubmit) : nextStep}
                        size="lg"
                        rightIcon={step < 4 ? <ChevronRight color={COLORS.text.light} size={20} /> : undefined}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    flex: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.background.main,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    progressContainer: {
        flex: 1,
        alignItems: 'center',
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: RADIUS.full,
        width: '80%',
        marginBottom: 6,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    },
    stepText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        color: COLORS.text.tertiary,
    },
    headerRight: {
        width: 40,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.lg,
    },
    tabletScrollContent: {
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        maxWidth: 500,
    },
    tabletContent: {
        backgroundColor: COLORS.background.card,
        padding: SPACING.xl,
        borderRadius: RADIUS.xl,
        marginTop: SPACING.xl,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    formSection: {
        width: '100%',
    },
    sectionTitle: {
        marginBottom: SPACING.xxs,
    },
    sectionSubtitle: {
        color: COLORS.text.secondary,
        marginBottom: SPACING.xl,
    },
    row: {
        flexDirection: 'row',
        gap: SPACING.base,
    },
    half: {
        flex: 1,
    },
    locationContainer: {
        marginTop: SPACING.md,
    },
    locationLabel: {
        marginBottom: SPACING.xs,
        marginLeft: SPACING.xs,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
        justifyContent: 'space-between',
        marginTop: SPACING.md,
    },
    imagePlaceholder: {
        width: '47%',
        aspectRatio: 0.85,
        backgroundColor: COLORS.background.surface,
        borderRadius: RADIUS.xl,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    imageIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.background.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        elevation: 1,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageLabel: {
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    infoBox: {
        backgroundColor: COLORS.primaryAlpha(0.08),
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        marginTop: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.primaryAlpha(0.2),
    },
    infoText: {
        fontWeight: TYPOGRAPHY.weight.medium,
        lineHeight: 20,
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.background.main,
        borderTopWidth: 1,
        borderTopColor: COLORS.divider,
    },
    tabletFooter: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        paddingBottom: SPACING.xxl,
    },
});
