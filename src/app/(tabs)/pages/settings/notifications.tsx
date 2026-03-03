import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { ChevronLeft, Bell, Heart, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AppText from '../../../../components/AppText';
import { COLORS } from '../../../../theme/colors';
import { SPACING, RADIUS } from '../../../../theme/spacing';
import { TYPOGRAPHY } from '../../../../theme/typography';

const SettingToggle = ({ icon: Icon, label, value, onValueChange }: any) => (
    <View style={styles.settingItem}>
        <View style={styles.settingIconContainer}>
            <Icon color={COLORS.text.primary} size={20} />
        </View>
        <AppText variant="body" style={styles.settingLabel}>{label}</AppText>
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: COLORS.divider, true: COLORS.primary }}
        />
    </View>
);

export default function NotificationsScreen() {
    const router = useRouter();
    const [notifications, setNotifications] = useState({
        matches: true,
        messages: true,
        updates: false
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text.primary} size={28} />
                </TouchableOpacity>
                <AppText variant="h2" style={styles.title}>Notifications</AppText>
            </View>

            <View style={styles.content}>
                <View style={styles.card}>
                    <SettingToggle
                        icon={Heart}
                        label="New Matches"
                        value={notifications.matches}
                        onValueChange={(v: boolean) => setNotifications(prev => ({ ...prev, matches: v }))}
                    />
                    <View style={styles.divider} />
                    <SettingToggle
                        icon={Bell}
                        label="Messages"
                        value={notifications.messages}
                        onValueChange={(v: boolean) => setNotifications(prev => ({ ...prev, messages: v }))}
                    />
                    <View style={styles.divider} />
                    <SettingToggle
                        icon={Star}
                        label="App Updates"
                        value={notifications.updates}
                        onValueChange={(v: boolean) => setNotifications(prev => ({ ...prev, updates: v }))}
                    />
                </View>
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
    card: {
        backgroundColor: COLORS.background.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.divider,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
    },
    settingIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.background.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    settingLabel: {
        flex: 1,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.divider,
        marginLeft: 64,
    },
});
