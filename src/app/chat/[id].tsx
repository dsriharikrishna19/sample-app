import React, { useState, useCallback, useRef } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Linking
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Send, MoreVertical, Phone } from 'lucide-react-native';
import { COLORS } from '../../theme/colors';
import { SPACING, RADIUS } from '../../theme/spacing';
import AppText from '../../components/AppText';
import Avatar from '../../components/Avatar';
import { MOCK_USERS } from '../../utils/mockData';
import PopoverMenu, { PopoverOption } from '../../components/PopoverMenu';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'them';
    timestamp: string;
}

export default function ChatDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const user = MOCK_USERS.find(u => u.id === id) || MOCK_USERS[0];

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: `Hi ${user.fullName.split(' ')[0]}! How are you doing?`, sender: 'me', timestamp: '10:30 AM' },
        { id: '2', text: 'Hey! I am doing great, thanks for asking. How about you?', sender: 'them', timestamp: '10:32 AM' },
        { id: '3', text: 'I am good too! Just saw your profile and thought I\'d say hi.', sender: 'me', timestamp: '10:35 AM' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const handleAction = (actionName: string) => {
        Alert.alert(
            actionName,
            `Are you sure you want to ${actionName.toLowerCase()} ${user.fullName}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: () => {
                        router.back();
                    }
                }
            ]
        );
    };

    const actionOptions: PopoverOption[] = [
        { label: 'Unmatch', onPress: () => handleAction('Unmatch') },
        { label: 'Block User', color: '#ef4444', onPress: () => handleAction('Block User') },
        { label: 'Delete Chat', color: '#ef4444', onPress: () => handleAction('Delete Chat') },
    ];

    const handleSend = useCallback(() => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText.trim(),
                sender: 'me',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, newMessage]);
            setInputText('');

            // Auto-scroll to bottom
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [inputText]);

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageContainer,
            item.sender === 'me' ? styles.myMessageContainer : styles.theirMessageContainer
        ]}>
            <View style={[
                styles.messageBubble,
                item.sender === 'me' ? styles.myMessage : styles.theirMessage
            ]}>
                <AppText variant="body" style={item.sender === 'me' ? styles.myMessageText : styles.theirMessageText}>
                    {item.text}
                </AppText>
                <AppText variant="tiny" style={styles.timestamp}>
                    {item.timestamp}
                </AppText>
            </View>
        </View>
    );

    const handleCall = () => {
        const phoneNumber = user.mobile || '1234567890';
        Linking.openURL(`tel:${phoneNumber}`).catch(err => {
            console.error('Error opening dialer', err);
            Alert.alert('Error', 'Could not open the phone dialer.');
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text.primary} size={28} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.userInfo} activeOpacity={0.7}>
                    <Avatar
                        uri={user.images[0]}
                        size={40}
                        showOnline={true}
                        style={{ marginRight: SPACING.sm }}
                    />
                    <View style={styles.headerText}>
                        <AppText variant="bodyBold" numberOfLines={1}>{user.fullName}</AppText>
                        <AppText variant="tiny" color={COLORS.primary}>Online</AppText>
                    </View>
                </TouchableOpacity>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerIcon} onPress={handleCall}>
                        <Phone color={COLORS.text.secondary} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerIcon}
                        onPress={() => setIsMenuVisible(true)}
                    >
                        <MoreVertical color={COLORS.text.secondary} size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                />

                <View style={styles.inputArea}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            placeholderTextColor={COLORS.text.tertiary}
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                        <TouchableOpacity
                            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                            onPress={handleSend}
                            disabled={!inputText.trim()}
                        >
                            <Send size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {/* Action Popup Menu */}
            <PopoverMenu
                visible={isMenuVisible}
                onClose={() => setIsMenuVisible(false)}
                options={actionOptions}
            />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.main,
    },
    flex: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
        backgroundColor: COLORS.background.card,
    },
    backButton: {
        padding: 4,
        marginRight: 4,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        padding: SPACING.sm,
        marginLeft: 4,
    },
    messageList: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    messageContainer: {
        marginBottom: SPACING.md,
        width: '100%',
    },
    myMessageContainer: {
        alignItems: 'flex-end',
    },
    theirMessageContainer: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: '75%',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        position: 'relative',
    },
    myMessage: {
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
    },
    theirMessage: {
        backgroundColor: COLORS.background.card,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    myMessageText: {
        color: '#FFF',
    },
    theirMessageText: {
        color: COLORS.text.primary,
    },
    timestamp: {
        fontSize: 9,
        marginTop: 4,
        alignSelf: 'flex-end',
        opacity: 0.7,
        color: 'inherit',
    },
    inputArea: {
        padding: SPACING.md,
        backgroundColor: COLORS.background.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.divider,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background.card,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.md,
        paddingVertical: Platform.OS === 'ios' ? 8 : 4,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text.primary,
        maxHeight: 100,
        paddingTop: Platform.OS === 'ios' ? 4 : 0,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SPACING.sm,
    },
    sendButtonDisabled: {
        backgroundColor: COLORS.text.tertiary,
        opacity: 0.6,
    },
});
