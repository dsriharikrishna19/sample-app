import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform
} from 'react-native';
import { MOCK_USERS } from '../../../utils/mockData';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import {
    Edit2,
    ChevronRight,
    User,
    Bell,
    ShieldCheck,
    HelpCircle,
    CreditCard
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { useRouter } from 'expo-router';
import Button from '../../../components/Button';
import AppText from '../../../components/AppText';
import { useResponsive } from '../../../hooks/useResponsive';
import { RootState } from '../../../store/store';


export default function ProfileScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isTablet } = useResponsive();
    const { user: authUser } = useSelector((state: RootState) => state.auth);

    // Fallback to MOCK_USERS[0] if no auth user
    const user = authUser || MOCK_USERS[0];

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    isTablet && styles.tabletScrollContent
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <AppText variant="h1" style={styles.title}>Profile</AppText>
                </View>

                <View style={[styles.contentContainer, isTablet && styles.tabletContent]}>
                    <View style={styles.profileCard}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: user.images ? user.images[0] : (user as any).profileImage }}
                                style={styles.profileImage}
                            />
                            <TouchableOpacity style={styles.editBadge}>
                                <Edit2 color={COLORS.text.light} size={16} />
                            </TouchableOpacity>
                        </View>
                        <AppText variant="h2" style={styles.name}>{user.fullName}, {user.age}</AppText>
                        <AppText variant="body" color={COLORS.text.secondary} style={styles.location}>
                            Hyderabad, Telangana
                        </AppText>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <AppText variant="h3" color={COLORS.primary}>12</AppText>
                            <AppText variant="tiny" style={styles.statLabel}>MATCHES</AppText>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <AppText variant="h3" color={COLORS.accent}>48</AppText>
                            <AppText variant="tiny" style={styles.statLabel}>LIKES</AppText>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <AppText variant="h3" color={COLORS.secondary}>PRO</AppText>
                            <AppText variant="tiny" style={styles.statLabel}>PLAN</AppText>
                        </View>
                    </View>

                    <View style={styles.settingsSection}>
                        <Button
                            title="Edit Profile"
                            onPress={() => { }}
                            variant="outline"
                            style={styles.editButton}
                        />
                        <View style={styles.infoCard}>
                            <AppText variant="bodyBold">Match Preferences</AppText>
                            <AppText variant="small" color={COLORS.text.secondary} style={{ marginTop: 4 }}>
                                Show me: Women · 18-30 · 50km
                            </AppText>
                        </View>
                    </View>

                    <AppText variant="tiny" align="center" color={COLORS.text.tertiary} style={styles.versionText}>
                        Version 1.0.0 (Build 124)
                    </AppText>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    scrollContent: {
        paddingBottom: SPACING.xxl,
    },
    tabletScrollContent: {
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    title: {
        fontWeight: TYPOGRAPHY.weight.black,
    },
    headerAction: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        maxWidth: 600,
        paddingHorizontal: SPACING.lg,
    },
    tabletContent: {
        paddingTop: SPACING.xl,
    },
    profileCard: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: SPACING.md,
        borderRadius: 70,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
            },
            android: {
                elevation: 10,
            }
        })
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 4,
        borderColor: COLORS.background.main,
    },
    editBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: COLORS.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.background.main,
    },
    name: {
        marginBottom: 2,
    },
    location: {
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.background.card,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.xl,
        marginBottom: SPACING.xl,
        elevation: 2,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: COLORS.divider,
        alignSelf: 'center',
    },
    statLabel: {
        fontWeight: TYPOGRAPHY.weight.bold,
        letterSpacing: 1,
        marginTop: 4,
    },
    settingsSection: {
        marginBottom: SPACING.xl,
    },
    editButton: {
        marginBottom: SPACING.lg,
    },
    infoCard: {
        backgroundColor: COLORS.background.card,
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    versionText: {
        marginBottom: SPACING.xl,
        letterSpacing: 0.5,
    }
});
