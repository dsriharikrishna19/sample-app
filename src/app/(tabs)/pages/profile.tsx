import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MOCK_USERS } from '../../../utils/mockData';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import {
    Edit2, X
} from 'lucide-react-native';
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
    const { user: authUser } = useSelector((state: RootState) => state.auth);

    // Fallback to MOCK_USERS[0] if no auth user
    const user = authUser || MOCK_USERS[0];

    // Edit Profile Modal State
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: user.fullName || '',
        age: user.age ? user.age.toString() : '',
        bio: user.bio || '',
        city: user.city || '',
        state: user.state || ''
    });

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/(auth)/login');
    };

    const handleEditAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to grant camera roll permissions to change your avatar.");
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

            // If the user object has an images array, update the first one
            // otherwise set a profileImage property
            let updatedData: any = {};
            if (user.images && user.images.length > 0) {
                const newImages = [...user.images];
                newImages[0] = newImageUri;
                updatedData.images = newImages;
            } else {
                updatedData.profileImage = newImageUri;
            }

            dispatch(updateProfile(updatedData));
        }
    };

    const handleSaveProfile = () => {
        const updatedData = {
            fullName: editForm.fullName,
            age: parseInt(editForm.age) || user.age,
            bio: editForm.bio,
            city: editForm.city,
            state: editForm.state
        };
        dispatch(updateProfile(updatedData));
        setIsEditModalVisible(false);
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
                            <Avatar
                                uri={user.images ? user.images[0] : (user as any).profileImage}
                                size={130}
                                imageStyle={{ borderWidth: 4, borderColor: COLORS.background.main }}
                            />
                            <TouchableOpacity style={styles.editBadge} onPress={handleEditAvatar}>
                                <Edit2 color={COLORS.text.light} size={16} />
                            </TouchableOpacity>
                        </View>
                        <AppText variant="h2" style={styles.name}>{user.fullName}, {user.age}</AppText>
                        <AppText variant="body" color={COLORS.text.secondary} style={styles.location}>
                            {user.city}, {user.state}
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
                            onPress={() => setIsEditModalVisible(true)}
                            variant="outline"
                            style={styles.editButton}
                        />
                        <View style={styles.infoCard}>
                            <AppText variant="bodyBold">About Me</AppText>
                            <AppText variant="small" color={COLORS.text.secondary} style={{ marginTop: 4 }}>
                                {user.bio || "No bio added yet."}
                            </AppText>
                        </View>
                        {(user as any).datingIntent && (
                            <View style={[styles.infoCard, { marginTop: SPACING.md }]}>
                                <AppText variant="bodyBold">Match Preferences</AppText>
                                <AppText variant="small" color={COLORS.text.secondary} style={{ marginTop: 4 }}>
                                    Looking for: {(user as any).datingIntent}
                                </AppText>
                            </View>
                        )}
                    </View>

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
                        <View style={styles.formGroup}>
                            <AppText variant="small" color={COLORS.text.secondary} style={styles.label}>Full Name</AppText>
                            <TextInput
                                style={styles.input}
                                value={editForm.fullName}
                                onChangeText={(text) => setEditForm(prev => ({ ...prev, fullName: text }))}
                                placeholderTextColor={COLORS.text.tertiary}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <AppText variant="small" color={COLORS.text.secondary} style={styles.label}>Age</AppText>
                            <TextInput
                                style={styles.input}
                                value={editForm.age}
                                onChangeText={(text) => setEditForm(prev => ({ ...prev, age: text }))}
                                keyboardType="numeric"
                                placeholderTextColor={COLORS.text.tertiary}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <AppText variant="small" color={COLORS.text.secondary} style={styles.label}>City</AppText>
                            <TextInput
                                style={styles.input}
                                value={editForm.city}
                                onChangeText={(text) => setEditForm(prev => ({ ...prev, city: text }))}
                                placeholderTextColor={COLORS.text.tertiary}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <AppText variant="small" color={COLORS.text.secondary} style={styles.label}>State/Region</AppText>
                            <TextInput
                                style={styles.input}
                                value={editForm.state}
                                onChangeText={(text) => setEditForm(prev => ({ ...prev, state: text }))}
                                placeholderTextColor={COLORS.text.tertiary}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <AppText variant="small" color={COLORS.text.secondary} style={styles.label}>Bio</AppText>
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
    // Profile Image is now handled by Avatar component size prop
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
    },
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
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
    modalCloseButton: {
        padding: SPACING.xs,
    },
    modalTitle: {
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    modalSaveButton: {
        padding: SPACING.xs,
    },
    modalBody: {
        flex: 1,
        padding: SPACING.lg,
    },
    formGroup: {
        marginBottom: SPACING.lg,
    },
    label: {
        marginBottom: SPACING.xs,
        marginLeft: SPACING.xs,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
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
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: Platform.OS === 'ios' ? 14 : 10,
    }
});
