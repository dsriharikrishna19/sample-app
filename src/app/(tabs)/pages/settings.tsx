import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch, Modal } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { useRouter } from 'expo-router';
import { RootState } from '../../../store/store';
import { MOCK_USERS } from '../../../utils/mockData';

const SettingItem = ({ icon: Icon, label, value, onPress, isSwitchOn, onSwitchChange, color = COLORS.text.primary, type = 'link' }: any) => (
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
        {type === 'switch' && <Switch value={isSwitchOn} onValueChange={onSwitchChange} trackColor={{ false: COLORS.divider, true: COLORS.primary }} />}
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user: authUser } = useSelector((state: RootState) => state.auth);
    const user = authUser || MOCK_USERS[0];
    const [isDarkMode, setIsDarkMode] = useState(false);

    // In a real app, Language preference would come from global state/context
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

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
                        <SettingItem icon={User} label="Edit Profile" onPress={() => router.push('/(tabs)/pages/profile')} />
                        <View style={styles.divider} />
                        <SettingItem icon={Smartphone} label="Phone Number" value={user.mobile || "+91 98765 43210"} onPress={() => { }} />
                        <View style={styles.divider} />
                        <SettingItem icon={CreditCard} label="Premium Subscription" value="Gold Plan" onPress={() => router.push('/(tabs)/pages/settings/premium')} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="caption" style={styles.sectionHeader}>PREFERENCES</AppText>
                    <View style={styles.settingsCard}>
                        <SettingItem icon={Bell} label="Notifications" onPress={() => router.push('/(tabs)/pages/settings/notifications')} />
                        <View style={styles.divider} />
                        <SettingItem
                            icon={Moon}
                            label="Dark Mode"
                            type="switch"
                            isSwitchOn={isDarkMode}
                            onSwitchChange={(value: boolean) => setIsDarkMode(value)}
                        />
                        <View style={styles.divider} />
                        <SettingItem icon={Globe} label="Language" value={selectedLanguage} onPress={() => router.push('/(tabs)/pages/settings/language')} />
                    </View>
                </View>

                <View style={styles.section}>
                    <AppText variant="caption" style={styles.sectionHeader}>SAFETY & LEGAL</AppText>
                    <View style={styles.settingsCard}>
                        <SettingItem icon={ShieldCheck} label="Privacy Policy" onPress={() => router.push('/(tabs)/pages/settings/privacy')} />
                        <View style={styles.divider} />
                        <SettingItem icon={HelpCircle} label="Help Center" onPress={() => router.push('/(tabs)/pages/settings/help')} />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLogoutModalVisible(true)}>
                    <LogOut color={COLORS.error} size={20} />
                    <AppText variant="bodyBold" color={COLORS.error} style={{ marginLeft: SPACING.sm }}>
                        Logout
                    </AppText>
                </TouchableOpacity>

                <AppText variant="tiny" align="center" color={COLORS.text.tertiary} style={styles.versionText}>
                    Version 1.0.0 (Build 124)
                </AppText>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal visible={isLogoutModalVisible} animationType="fade" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.logoutModalContent}>
                        <View style={styles.logoutIconContainer}>
                            <LogOut color={COLORS.error} size={32} />
                        </View>
                        <AppText variant="h2" align="center" style={{ marginBottom: SPACING.sm }}>Log Out</AppText>
                        <AppText variant="body" align="center" color={COLORS.text.secondary} style={{ marginBottom: SPACING.xl }}>
                            Are you sure you want to log out of your account?
                        </AppText>

                        <View style={styles.logoutModalButtons}>
                            <TouchableOpacity
                                style={[styles.logoutModalButton, styles.logoutCancelButton]}
                                onPress={() => setIsLogoutModalVisible(false)}
                            >
                                <AppText variant="bodyBold" color={COLORS.text.primary}>Cancel</AppText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.logoutModalButton, styles.logoutConfirmButton]}
                                onPress={() => {
                                    setIsLogoutModalVisible(false);
                                    handleLogout();
                                }}
                            >
                                <AppText variant="bodyBold" color={COLORS.error}>Logout</AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    logoutModalContent: {
        backgroundColor: COLORS.background.main,
        borderRadius: RADIUS.xxl,
        padding: SPACING.xl,
        alignItems: 'center',
        width: '100%',
        maxWidth: 340,
        elevation: 10,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    logoutIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.error + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    logoutModalButtons: {
        flexDirection: 'row',
        gap: SPACING.md,
        width: '100%',
    },
    logoutModalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutCancelButton: {
        backgroundColor: COLORS.background.surface,
    },
    logoutConfirmButton: {
        backgroundColor: COLORS.error + '15',
        borderWidth: 1,
        borderColor: COLORS.error + '30',
    }
});
