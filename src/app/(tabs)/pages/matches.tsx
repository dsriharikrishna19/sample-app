import React, { useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';
import { MOCK_USERS } from '../../../utils/mockData';
import { COLORS } from '../../../theme/colors';
import { SPACING, RADIUS } from '../../../theme/spacing';
import { TYPOGRAPHY } from '../../../theme/typography';
import { Search, ChevronRight, MessageSquare } from 'lucide-react-native';
import AppText from '../../../components/AppText';
import { useResponsive } from '../../../hooks/useResponsive';

const NewMatchItem = ({ item }: { item: typeof MOCK_USERS[0] }) => (
    <TouchableOpacity style={styles.newMatchItem} activeOpacity={0.8}>
        <View style={styles.newMatchAvatarContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.newMatchAvatar} />
            <View style={styles.onlineStatus} />
        </View>
        <AppText variant="caption" style={styles.newMatchName} numberOfLines={1}>
            {item.fullName.split(' ')[0]}
        </AppText>
    </TouchableOpacity>
);

const MessageItem = React.memo(({ item }: { item: typeof MOCK_USERS[0] }) => (
    <TouchableOpacity style={styles.messageItem} activeOpacity={0.6}>
        <Image source={{ uri: item.images[0] }} style={styles.avatar} />
        <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
                <AppText variant="body" style={styles.name}>{item.fullName}</AppText>
                <AppText variant="caption" color={COLORS.text.tertiary}>2:15 PM</AppText>
            </View>
            <View style={styles.messageFooter}>
                <AppText variant="small" color={COLORS.text.secondary} numberOfLines={1} style={styles.lastMessageText}>
                    Actually, I'd love to check out that new cafe!
                </AppText>
                <View style={styles.unreadBadge}>
                    <AppText variant="tiny" color={COLORS.text.light} style={styles.unreadCount}>1</AppText>
                </View>
            </View>
        </View>
    </TouchableOpacity>
));

export default function MatchesScreen() {
    const { isTablet } = useResponsive();

    const renderMessageItem = useCallback(({ item }: { item: typeof MOCK_USERS[0] }) => (
        <MessageItem item={item} />
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AppText variant="h1" style={styles.title}>Matches</AppText>
                <TouchableOpacity style={styles.headerAction}>
                    <MessageSquare color={COLORS.primary} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search color={COLORS.text.tertiary} size={20} style={{ marginRight: SPACING.sm }} />
                    <TextInput
                        placeholder="Search matches"
                        placeholderTextColor={COLORS.text.tertiary}
                        style={styles.searchInput}
                    />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={isTablet && styles.tabletContent}>
                <View style={styles.section}>
                    <AppText variant="h3" style={styles.sectionTitle}>New Matches</AppText>
                    <FlatList
                        horizontal
                        data={MOCK_USERS.slice(0, 8)}
                        renderItem={({ item }) => <NewMatchItem item={item} />}
                        keyExtractor={(item) => `new-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.newMatchesList}
                    />
                </View>

                <View style={styles.section}>
                    <AppText variant="h3" style={styles.sectionTitle}>Messages</AppText>
                    <FlatList
                        data={MOCK_USERS}
                        renderItem={renderMessageItem}
                        keyExtractor={(item) => `msg-${item.id}`}
                        scrollEnabled={false}
                        contentContainerStyle={styles.messagesList}
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
        borderRadius: 22,
        backgroundColor: COLORS.primaryAlpha(0.1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.surface,
        paddingHorizontal: SPACING.md,
        height: 48,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text.primary,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    },
    tabletContent: {
        alignItems: 'center',
    },
    section: {
        paddingVertical: SPACING.md,
        width: '100%',
        maxWidth: 600,
    },
    sectionTitle: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        color: COLORS.text.primary,
    },
    newMatchesList: {
        paddingLeft: SPACING.lg,
        paddingRight: SPACING.md,
    },
    newMatchItem: {
        alignItems: 'center',
        marginRight: SPACING.lg,
        width: 70,
    },
    newMatchAvatarContainer: {
        position: 'relative',
        marginBottom: SPACING.xs,
    },
    newMatchAvatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    onlineStatus: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: COLORS.background.main,
    },
    newMatchName: {
        fontWeight: TYPOGRAPHY.weight.semibold,
        fontSize: 11,
    },
    messagesList: {
        paddingBottom: SPACING.xl,
    },
    messageItem: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: SPACING.md,
    },
    messageContent: {
        flex: 1,
        height: 56,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessageText: {
        flex: 1,
        marginRight: SPACING.md,
    },
    unreadBadge: {
        backgroundColor: COLORS.primary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadCount: {
        fontWeight: TYPOGRAPHY.weight.bold,
        fontSize: 10,
    },
});
