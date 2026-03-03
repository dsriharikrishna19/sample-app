import React, { useCallback, useState, useMemo } from 'react';
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
import { Search, X } from 'lucide-react-native';
import AppText from '../../../components/AppText';
import Avatar from '../../../components/Avatar';
import { useResponsive } from '../../../hooks/useResponsive';
import { useRouter } from 'expo-router';

const NewMatchItem = ({ item }: { item: typeof MOCK_USERS[0] }) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            style={styles.newMatchItem}
            activeOpacity={0.8}
            onPress={() => router.push(`/chat/${item.id}`)}
        >
            <View style={styles.newMatchAvatarContainer}>
                <Avatar
                    uri={item.images[0]}
                    size={64}
                    showOnline={true}
                    imageStyle={{ borderWidth: 2, borderColor: COLORS.primary }}
                />
            </View>
            <AppText variant="tiny" style={styles.newMatchName} numberOfLines={1}>
                {item.fullName.split(' ')[0]}
            </AppText>
        </TouchableOpacity>
    );
};

const MessageItem = React.memo(({ item, index }: { item: typeof MOCK_USERS[0], index: number }) => {
    const router = useRouter();
    // Simulate dynamic data based on index
    const lastMessages = [
        "Hey! Are we still meeting tomorrow?",
        "That sounds like a great plan!",
        "I just finished work, let's talk?",
        "Did you see that new movie yet?",
        "Haha, you're so funny 😂",
        "Maybe next weekend works better?"
    ];
    const timestamps = ["2:15 PM", "1:05 PM", "Yesterday", "Yesterday", "Monday", "Sunday"];
    const isUnread = index < 2; // Simulate some unread messages

    return (
        <View style={styles.messageItemContainer}>
            <TouchableOpacity
                style={styles.messageItem}
                activeOpacity={0.6}
                onPress={() => router.push(`/chat/${item.id}`)}
            >
                <View style={styles.avatarContainer}>
                    <Avatar
                        uri={item.images[0]}
                        size={60}
                        showOnline={isUnread} // Example logic: online if unread 
                    />
                </View>
                <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                        <AppText variant="bodyBold" style={[styles.name, isUnread && styles.unreadName]}>
                            {item.fullName}
                        </AppText>
                        <AppText variant="tiny" color={isUnread ? COLORS.primary : COLORS.text.tertiary} weight={isUnread ? "bold" : "regular"}>
                            {timestamps[index % timestamps.length]}
                        </AppText>
                    </View>
                    <View style={styles.messageFooter}>
                        <AppText
                            variant="small"
                            color={isUnread ? COLORS.text.primary : COLORS.text.secondary}
                            weight={isUnread ? "medium" : "regular"}
                            numberOfLines={1}
                            style={styles.lastMessageText}
                        >
                            {lastMessages[index % lastMessages.length]}
                        </AppText>
                        {isUnread && (
                            <View style={styles.unreadBadge}>
                                <AppText variant="tiny" color={COLORS.text.light} style={styles.unreadCount}>1</AppText>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {index < MOCK_USERS.length - 1 && <View style={styles.separator} />}
        </View>
    );
});

export default function ChatScreen() {
    const { isTablet } = useResponsive();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = useMemo(() => {
        if (!searchQuery.trim()) return MOCK_USERS;
        const query = searchQuery.toLowerCase();
        return MOCK_USERS.filter(user =>
            user.fullName.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const filteredRecent = useMemo(() => {
        return filteredChats.slice(0, 8);
    }, [filteredChats]);

    const renderMessageItem = useCallback(({ item, index }: { item: typeof MOCK_USERS[0], index: number }) => (
        <MessageItem item={item} index={index} />
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AppText variant="h1" style={styles.title}>Messages</AppText>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search color={COLORS.text.tertiary} size={20} style={{ marginRight: SPACING.sm }} />
                    <TextInput
                        placeholder="Search messages"
                        placeholderTextColor={COLORS.text.tertiary}
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <X color={COLORS.text.tertiary} size={18} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={isTablet && styles.tabletContent}>
                {filteredRecent.length > 0 && !searchQuery && (
                    <View style={styles.section}>
                        <AppText variant="h3" style={styles.sectionTitle}>Recent Matches</AppText>
                        <FlatList
                            horizontal
                            data={filteredRecent}
                            renderItem={({ item }) => <NewMatchItem item={item} />}
                            keyExtractor={(item) => `new-${item.id}`}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.newMatchesList}
                        />
                    </View>
                )}

                <View style={styles.section}>
                    <AppText variant="h3" style={styles.sectionTitle}>
                        {searchQuery ? 'Results' : 'Chats'}
                    </AppText>
                    {filteredChats.length > 0 ? (
                        <FlatList
                            data={filteredChats}
                            renderItem={renderMessageItem}
                            keyExtractor={(item) => `msg-${item.id}`}
                            scrollEnabled={false}
                            contentContainerStyle={styles.messagesList}
                        />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Search color={COLORS.text.tertiary} size={40} />
                            <AppText variant="bodyBold" style={{ marginTop: SPACING.sm }}>No conversations found</AppText>
                            <AppText variant="small" color={COLORS.text.tertiary}>Try a different name</AppText>
                        </View>
                    )}
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
    newChatButton: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.background.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.divider,
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
        height: 52,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text.primary,
        fontWeight: '500',
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
        fontWeight: TYPOGRAPHY.weight.bold,
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
    newMatchName: {
        fontWeight: TYPOGRAPHY.weight.semibold,
        marginTop: 4,
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
    messageContent: {
        flex: 1,
        justifyContent: 'center',
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontWeight: TYPOGRAPHY.weight.black,
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
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadCount: {
        fontWeight: TYPOGRAPHY.weight.bold,
        fontSize: 10,
    },
    messageItemContainer: {
        width: '100%',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: SPACING.md,
    },
    activeDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4ade80',
        borderWidth: 2,
        borderColor: COLORS.background.main,
    },
    unreadName: {
        color: COLORS.text.primary,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.divider,
        marginLeft: 80, // avatar width + margin
        marginRight: SPACING.lg,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: SPACING.xxl,
        marginTop: SPACING.xl,
    },
});
