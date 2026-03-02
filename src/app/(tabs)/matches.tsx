import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { MOCK_USERS } from '../../utils/mockData';
import { COLORS } from '../../theme/colors';
import { SPACING, RADIUS } from '../../theme/spacing';
import { ChevronRight } from 'lucide-react-native';

const MatchItem = React.memo(({ item }: { item: typeof MOCK_USERS[0] }) => (
    <TouchableOpacity style={styles.matchItem} activeOpacity={0.7}>
        <Image source={{ uri: item.images[0] }} style={styles.avatar} />
        <View style={styles.matchInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>
                Sent you a message
            </Text>
        </View>
        <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>2:15 PM</Text>
            <ChevronRight {...({ stroke: COLORS.text.secondary, size: 20 } as any)} />
        </View>
    </TouchableOpacity>
));

export default function MatchesScreen() {
    const renderItem = useCallback(({ item }: { item: typeof MOCK_USERS[0] }) => (
        <MatchItem item={item} />
    ), []);

    const keyExtractor = useCallback((item: typeof MOCK_USERS[0]) => item.id, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Matches</Text>
            </View>
            <FlatList
                data={MOCK_USERS}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                removeClippedSubviews={true}
                initialNumToRender={10}
                windowSize={5}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    header: {
        padding: SPACING.lg,
        backgroundColor: COLORS.background.card,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
    matchItem: {
        flexDirection: 'row',
        padding: SPACING.md,
        alignItems: 'center',
        backgroundColor: COLORS.background.card,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: SPACING.md,
    },
    matchInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    lastMessage: {
        fontSize: 14,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
    timestampContainer: {
        alignItems: 'flex-end',
    },
    timestamp: {
        fontSize: 12,
        color: COLORS.text.secondary,
        marginBottom: 4,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border,
        marginLeft: 80,
    },
});
