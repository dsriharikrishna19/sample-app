import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { ChevronLeft, Search, BookOpen, MessageCircleQuestion, ShieldAlert } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AppText from '../../../../components/AppText';
import { COLORS } from '../../../../theme/colors';
import { SPACING, RADIUS } from '../../../../theme/spacing';
import { TYPOGRAPHY } from '../../../../theme/typography';

const HelpCard = ({ icon: Icon, title, description }: any) => (
    <TouchableOpacity style={styles.helpCard}>
        <View style={styles.iconContainer}>
            <Icon color={COLORS.primary} size={24} />
        </View>
        <View style={styles.helpText}>
            <AppText variant="bodyBold">{title}</AppText>
            <AppText variant="small" color={COLORS.text.tertiary}>{description}</AppText>
        </View>
    </TouchableOpacity>
);

export default function HelpScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text.primary} size={28} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.title}>Help Center</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.searchContainer}>
                    <Search color={COLORS.text.tertiary} size={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="How can we help?"
                        placeholderTextColor={COLORS.text.tertiary}
                    />
                </View>

                <AppText variant="h3" style={styles.sectionTitle}>Popular Topics</AppText>

                <HelpCard
                    icon={BookOpen}
                    title="A Guide to Tinder"
                    description="Getting started, how it works, and setting up your profile."
                />

                <HelpCard
                    icon={MessageCircleQuestion}
                    title="Troubleshooting"
                    description="Login issues, app crashes, and payment questions."
                />

                <HelpCard
                    icon={ShieldAlert}
                    title="Safety & Security"
                    description="Reporting users, privacy settings, and keeping safe."
                />

                <AppText variant="h3" style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>Contact Us</AppText>

                <TouchableOpacity style={styles.contactButton}>
                    <AppText variant="bodyBold" color={COLORS.text.light}>Submit a Request</AppText>
                </TouchableOpacity>

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.surface,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        height: 48,
        marginBottom: SPACING.xl,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: 16,
        color: COLORS.text.primary,
    },
    sectionTitle: {
        marginBottom: SPACING.md,
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    helpCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.card,
        padding: SPACING.md,
        borderRadius: RADIUS.xl,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    helpText: {
        flex: 1,
    },
    contactButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
    }
});
