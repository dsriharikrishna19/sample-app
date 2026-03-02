import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { MOCK_USERS } from '../../utils/mockData';
import { COLORS } from '../../theme/colors';
import { SPACING, RADIUS } from '../../theme/spacing';
import { Settings, Edit2, LogOut } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'expo-router';
import Button from '../../components/Button';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = MOCK_USERS[0]; // Self profile

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity>
                        <Settings {...({ stroke: COLORS.text.primary, size: 24 } as any)} />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: user.images[0] }} style={styles.profileImage} />
                        <TouchableOpacity style={styles.editBadge}>
                            <Edit2 {...({ stroke: "#FFF", size: 16 } as any)} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{user.name}, {user.age}</Text>
                    <Text style={styles.bio}>{user.bio}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Matches</Text>
                    </View>
                    <View style={[styles.statItem, styles.statBorder]}>
                        <Text style={styles.statNumber}>48</Text>
                        <Text style={styles.statLabel}>Likes</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>premium</Text>
                        <Text style={styles.statLabel}>Plan</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <Button
                        title="Edit Profile"
                        onPress={() => { }}
                        variant="outline"
                        style={styles.actionButton}
                    />
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                        variant="ghost"
                        style={styles.logoutButton}
                        textStyle={{ color: COLORS.error }}
                    />
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
        paddingBottom: SPACING.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.lg,
        backgroundColor: COLORS.background.card,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    profileSection: {
        alignItems: 'center',
        padding: SPACING.xl,
        backgroundColor: COLORS.background.card,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: SPACING.md,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    bio: {
        fontSize: 14,
        color: COLORS.text.secondary,
        textAlign: 'center',
        paddingHorizontal: SPACING.xl,
    },
    statsContainer: {
        flexDirection: 'row',
        padding: SPACING.lg,
        backgroundColor: COLORS.background.card,
        marginTop: SPACING.md,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: COLORS.border,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
    actions: {
        padding: SPACING.lg,
        marginTop: SPACING.md,
    },
    actionButton: {
        marginBottom: SPACING.md,
    },
    logoutButton: {
        marginTop: SPACING.sm,
    },
});
