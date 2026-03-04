import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { Edit2, X, LogOut } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateProfile } from '../../../store/slices/authSlice';
import { useRouter } from 'expo-router';
import Button from '../../../components/Button';
import AppText from '../../../components/AppText';
import Avatar from '../../../components/Avatar';
import { useResponsive } from '../../../hooks/useResponsive';
import { RootState } from '../../../store/store';

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isTablet } = useResponsive();
    const { user } = useSelector((state: RootState) => state.auth);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: user?.fullName || '',
        age: user?.age ? user.age.toString() : '',
        bio: user?.bio || '',
        city: user?.city || '',
        state: user?.state || '',
    });

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout', style: 'destructive', onPress: () => {
                    dispatch(logout());
                    router.replace('/(auth)/login');
                }
            },
        ]);
    };

    const handleEditAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to grant camera roll permissions to change your photo.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const newImageUri = result.assets[0].uri;
            const newImages = user?.images ? [...user.images] : ['', '', '', ''];
            newImages[0] = newImageUri;
            dispatch(updateProfile({ images: newImages }));
        }
    };

    const handleSaveProfile = () => {
        dispatch(updateProfile({
            fullName: editForm.fullName,
            age: parseInt(editForm.age) || user?.age,
            bio: editForm.bio,
            city: editForm.city,
            state: editForm.state,
        }));
        setIsEditModalVisible(false);
    };

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AppText variant="body" color={COLORS.text.secondary}>No profile found. Please complete onboarding.</AppText>
                </View>
            </SafeAreaView>
        );
    }

    const profileImage = user.images && user.images.length > 0 ? user.images[0] : undefined;
    const extraImages = user.images ? user.images.slice(1).filter(img => img && img.length > 0) : [];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, isTablet && styles.tabletScrollContent]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <AppText variant="h1" style={styles.title}>My Profile</AppText>
                    <TouchableOpacity onPress={handleLogout} style={styles.headerAction}>
                        <LogOut color={COLORS.text.secondary} size={22} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.contentContainer, isTablet && styles.tabletContent]}>
                    {/* Avatar + Name */}
                    <View style={styles.profileCard}>
                        <View style={styles.imageContainer}>
                            <Avatar
                                uri={profileImage}
                                size={130}
                                imageStyle={{ borderWidth: 4, borderColor: COLORS.background.main }}
                            />
                            <TouchableOpacity style={styles.editBadge} onPress={handleEditAvatar}>
                                <Edit2 color={COLORS.text.light} size={16} />
                            </TouchableOpacity>
                        </View>
                        <AppText variant="h2" style={styles.name}>{user.fullName}, {user.age}</AppText>
                        <AppText variant="body" color={COLORS.text.secondary} style={styles.location}>
                            {user.city}, {user.state}, {user.country}
                        </AppText>
                        <View style={styles.tagRow}>
                            {user.zodiacSign && (
                                <View style={styles.tag}>
                                    <AppText variant="tiny" color={COLORS.primary}>✦ {user.zodiacSign}</AppText>
                                </View>
                            )}
                            {user.gender && (
                                <View style={styles.tag}>
                                    <AppText variant="tiny" color={COLORS.secondary} style={{ textTransform: 'capitalize' }}>
                                        {user.gender.replace('_', ' ')}
                                    </AppText>
                                </View>
                            )}
                            {user.height && (
                                <View style={styles.tag}>
                                    <AppText variant="tiny" color={COLORS.text.secondary}>{user.height} cm</AppText>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Stats */}
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

                    {/* Edit Button */}
                    <Button
                        title="Edit Profile"
                        onPress={() => {
                            setEditForm({
                                fullName: user.fullName || '',
                                age: user.age ? user.age.toString() : '',
                                bio: user.bio || '',
                                city: user.city || '',
                                state: user.state || '',
                            });
                            setIsEditModalVisible(true);
                        }}
                        variant="outline"
                        style={styles.editButton}
                    />

                    {/* Bio */}
                    <View style={styles.infoCard}>
                        <AppText variant="bodyBold">About Me</AppText>
                        <AppText variant="small" color={COLORS.text.secondary} style={{ marginTop: 4 }}>
                            {user.bio || "No bio added yet."}
                        </AppText>
                    </View>

                    {/* Match Preferences */}
                    {(user.datingIntent || user.relationshipType) && (
                        <View style={[styles.infoCard, { marginTop: SPACING.md }]}>
                            <AppText variant="bodyBold">Match Preferences</AppText>
                            {user.relationshipType && (
                                <AppText variant="small" color={COLORS.text.secondary} style={{ marginTop: 4 }}>
                                    Relationship type: {user.relationshipType}
                                </AppText>
                            )}
                            {user.datingIntent && (
                                <AppText variant="small" color={COLORS.text.secondary} style={{ marginTop: 2 }}>
                                    Looking for: {user.datingIntent}
                                </AppText>
                            )}
                        </View>
                    )}

                    {/* Interests */}
                    {user.interests && user.interests.length > 0 && (
                        <View style={[styles.infoCard, { marginTop: SPACING.md }]}>
                            <AppText variant="bodyBold" style={{ marginBottom: SPACING.sm }}>Interests</AppText>
                            <View style={styles.interestRow}>
                                {user.interests.map((interest, idx) => (
                                    <View key={idx} style={styles.interestTag}>
                                        <AppText variant="tiny" color={COLORS.primary}>{interest}</AppText>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Photo Gallery */}
                    {extraImages.length > 0 && (
                        <View style={[styles.infoCard, { marginTop: SPACING.md }]}>
                            <AppText variant="bodyBold" style={{ marginBottom: SPACING.sm }}>Photos</AppText>
                            <View style={styles.photoGrid}>
                                {extraImages.map((img, idx) => (
                                    <Image key={idx} source={{ uri: img }} style={styles.gridPhoto} />
                                ))}
                            </View>
                        </View>
                    )}

                    <AppText variant="tiny" align="center" color={COLORS.text.tertiary} style={styles.versionText}>
                        Version 1.0.0 (Build 124)
                    </AppText>
                </View>
            </ScrollView>

            {/* Edit Profile Modal */}
            <Modal
                visible={isEditModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsEditModalVisible(false)}
            >
                <KeyboardAvoidingView
                    style={styles.modalContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setIsEditModalVisible(false)} style={styles.modalCloseButton}>
                            <X color={COLORS.text.primary} size={24} />
                        </TouchableOpacity>
                        <AppText variant="h3" style={styles.modalTitle}>Edit Profile</AppText>
                        <TouchableOpacity onPress={handleSaveProfile} style={styles.modalSaveButton}>
                            <AppText variant="bodyBold" color={COLORS.primary}>Save</AppText>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                        {[
                            { label: 'Full Name', key: 'fullName', keyboard: 'default' },
                            { label: 'Age', key: 'age', keyboard: 'numeric' },
                            { label: 'City', key: 'city', keyboard: 'default' },
                            { label: 'State/Region', key: 'state', keyboard: 'default' },
                        ].map(({ label, key, keyboard }) => (
                            <View key={key} style={styles.formGroup}>
                                <AppText variant="small" color={COLORS.text.secondary} style={styles.inputLabel}>{label}</AppText>
                                <TextInput
                                    style={styles.input}
                                    value={editForm[key as keyof typeof editForm]}
                                    onChangeText={(text) => setEditForm(prev => ({ ...prev, [key]: text }))}
                                    keyboardType={keyboard as any}
                                    placeholderTextColor={COLORS.text.tertiary}
                                />
                            </View>
                        ))}

                        <View style={styles.formGroup}>
                            <AppText variant="small" color={COLORS.text.secondary} style={styles.inputLabel}>Bio</AppText>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={editForm.bio}
                                onChangeText={(text) => setEditForm(prev => ({ ...prev, bio: text }))}
                                multiline
                                numberOfLines={4}
                                placeholder="Write a short summary about yourself..."
                                placeholderTextColor={COLORS.text.tertiary}
                            />
                        </View>

                        <View style={{ height: 40 }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background.main },
    scrollContent: { paddingBottom: SPACING.xxl },
    tabletScrollContent: { alignItems: 'center' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    title: { fontWeight: TYPOGRAPHY.weight.black },
    headerAction: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
    contentContainer: { width: '100%', maxWidth: 600, paddingHorizontal: SPACING.lg },
    tabletContent: { paddingTop: SPACING.xl },
    profileCard: { alignItems: 'center', paddingVertical: SPACING.xl },
    imageContainer: {
        position: 'relative',
        marginBottom: SPACING.md,
        borderRadius: 70,
        ...Platform.select({
            ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12 },
            android: { elevation: 10 },
        }),
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
    name: { marginBottom: 2 },
    location: { fontWeight: TYPOGRAPHY.weight.medium },
    tagRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: SPACING.sm, gap: SPACING.xs },
    tag: {
        backgroundColor: COLORS.background.surface,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: COLORS.divider,
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
    statItem: { flex: 1, alignItems: 'center' },
    statDivider: { width: 1, height: '60%', backgroundColor: COLORS.divider, alignSelf: 'center' },
    statLabel: { fontWeight: TYPOGRAPHY.weight.bold, letterSpacing: 1, marginTop: 4 },
    editButton: { marginBottom: SPACING.lg },
    infoCard: {
        backgroundColor: COLORS.background.card,
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs },
    interestTag: {
        backgroundColor: COLORS.background.surface,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: COLORS.primary + '40',
    },
    photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
    gridPhoto: { width: 90, height: 90, borderRadius: RADIUS.md },
    versionText: { marginTop: SPACING.xl, marginBottom: SPACING.xl, letterSpacing: 0.5 },
    modalContainer: { flex: 1, backgroundColor: COLORS.background.main },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: Platform.OS === 'ios' ? SPACING.lg : SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
        backgroundColor: COLORS.background.card,
    },
    modalCloseButton: { padding: SPACING.xs },
    modalTitle: { fontWeight: TYPOGRAPHY.weight.bold },
    modalSaveButton: { padding: SPACING.xs },
    modalBody: { flex: 1, padding: SPACING.lg },
    formGroup: { marginBottom: SPACING.lg },
    inputLabel: { marginBottom: SPACING.xs, marginLeft: SPACING.xs, fontWeight: TYPOGRAPHY.weight.medium },
    input: {
        backgroundColor: COLORS.background.surface,
        borderWidth: 1,
        borderColor: COLORS.divider,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
        fontSize: 16,
        color: COLORS.text.primary,
    },
    textArea: { minHeight: 100, textAlignVertical: 'top', paddingTop: Platform.OS === 'ios' ? 14 : 10 },
});
