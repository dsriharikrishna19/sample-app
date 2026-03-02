import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import {
    User,
    Bell,
    ShieldCheck,
    CreditCard,
    HelpCircle,
    LogOut,
    ChevronRight,
    Moon,
    Globe,
    Smartphone
} from 'lucide-react-native';
import AppText from '../../../components/AppText';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { useRouter } from 'expo-router';

const SettingItem = ({ icon: Icon, label, value, onPress, color = COLORS.text.primary, type = 'link' }: any) => (
    <TouchableOpacity
        style={styles.settingItem}
        onPress={onPress}
        activeOpacity={0.6}
        disabled={type === 'switch'}
    >
        <View style={styles.settingIconContainer}>
            <Icon color={color} size={20} />
        </View>
        <View style={styles.settingTextContainer}>
            <AppText variant="body" style={[styles.settingLabel, { color }]}>{label}</AppText>
            {value && <AppText variant="small" color={COLORS.text.tertiary}>{value}</AppText>}
        </View>
        {type === 'link' && <ChevronRight color={COLORS.text.tertiary} size={18} />}
        {type === 'switch' && <Switch value={true} trackColor={{ false: COLORS.divider, true: COLORS.primary }} />}
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AppText variant="h1" style={styles.title}>Settings</AppText>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.section}>
                    <AppText variant="caption" style={styles.sectionHeader}>ACCOUNT</AppText>
                    <View style={styles.settingsCard}>
                        <SettingItem icon={User} label="Edit Profile" onPress={() => { }} />
                        <View style={styles.divider} />
                        <SettingItem icon={Smartphone} label="Phone Number" value="+91 98765 43210" onPress={() => { }} />
                        <View style={styles.divider} />
                        <SettingItem icon={CreditCard} label="Premium Subscription" value="Gold Plan" onPress={() => { }} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="caption" style={styles.sectionHeader}>PREFERENCES</AppText>
                    <View style={styles.settingsCard}>
                        <SettingItem icon={Bell} label="Notifications" onPress={() => { }} />
                        <View style={styles.divider} />
                        <SettingItem icon={Moon} label="Dark Mode" type="switch" />
                        <View style={styles.divider} />
                        <SettingItem icon={Globe} label="Language" value="English" onPress={() => { }} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="caption" style={styles.sectionHeader}>SAFETY & LEGAL</AppText>
                    <View style={styles.settingsCard}>
                        <SettingItem icon={ShieldCheck} label="Privacy Policy" onPress={() => { }} />
                        <View style={styles.divider} />
                        <SettingItem icon={HelpCircle} label="Help Center" onPress={() => { }} />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut color={COLORS.error} size={20} />
                    <AppText variant="bodyBold" color={COLORS.error} style={{ marginLeft: SPACING.sm }}>
                        Logout
                    </AppText>
                </TouchableOpacity>

                <AppText variant="tiny" align="center" color={COLORS.text.tertiary} style={styles.versionText}>
                    Version 1.0.0 (Build 124)
                </AppText>
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
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    title: {
        fontWeight: TYPOGRAPHY.weight.black,
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        marginLeft: SPACING.xs,
        marginBottom: SPACING.sm,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: COLORS.text.tertiary,
    },
    settingsCard: {
        backgroundColor: COLORS.background.card,
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.divider,
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
    settingTextContainer: {
        flex: 1,
    },
    settingLabel: {
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.divider,
        marginLeft: 64,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background.card,
        padding: SPACING.md,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.error + '40',
        marginTop: SPACING.md,
    },
    versionText: {
        marginTop: SPACING.xxl,
        marginBottom: SPACING.md,
    }
});
