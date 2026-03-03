import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AppText from '../../../../components/AppText';
import { COLORS } from '../../../../theme/colors';
import { SPACING } from '../../../../theme/spacing';
import { TYPOGRAPHY } from '../../../../theme/typography';

export default function PrivacyScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text.primary} size={28} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.title}>Privacy Policy</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <AppText variant="body" style={styles.paragraph}>
                    Last updated: October 24, 2023
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>1. Information We Collect</AppText>
                <AppText variant="body" style={styles.paragraph}>
                    When you use our services, we collect information about the features you've used, how you've used them, and the devices you use to access our services. This includes your IP address, device ID and type, device-specific and apps settings and characteristics, app crashes, advertising IDs, browser type, version and language, operating system, time zones, identifiers associated with cookies or other technologies that may uniquely identify your device or browser.
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>2. How We Use Information</AppText>
                <AppText variant="body" style={styles.paragraph}>
                    The main reason we use your information is to deliver and improve our services. Additionally, we use your info to help keep you safe and to provide you with advertising that may be of interest to you.
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>3. How We Share Information</AppText>
                <AppText variant="body" style={styles.paragraph}>
                    Since our goal is to help you make meaningful connections, the main sharing of users' information is, of course, with other users. We also share some user information with service providers and partners who assist us in operating the services and, in some cases, legal authorities.
                </AppText>

                <AppText variant="h3" style={styles.sectionTitle}>4. Your Rights</AppText>
                <AppText variant="body" style={styles.paragraph}>
                    We want you to be in control of your information, so we have provided you with the following tools: Access/Update tools in the service. Account deletion. Device permissions. Privacy rights inquiries.
                </AppText>

                <View style={{ height: SPACING.xxxl }} />
            </ScrollView>
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
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    backButton: {
        marginRight: SPACING.md,
    },
    title: {
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    content: {
        padding: SPACING.lg,
    },
    sectionTitle: {
        marginTop: SPACING.lg,
        marginBottom: SPACING.sm,
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    paragraph: {
        color: COLORS.text.secondary,
        lineHeight: 22,
        marginBottom: SPACING.md,
    }
});
