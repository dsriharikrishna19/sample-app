import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Send } from 'lucide-react-native';
import { useApi } from '../../hooks/useApi';
import { COLORS } from '../../theme/colors';
import { SPACING, RADIUS } from '../../theme/spacing';

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'them';
    timestamp: number;
}

const MOCK_MESSAGES: Message[] = [
    { id: '1', text: 'Hey Sarah! How is it going?', sender: 'me', timestamp: Date.now() - 100000 },
    { id: '2', text: 'Doing great! Just finishing up some work. You?', sender: 'them', timestamp: Date.now() - 50000 },
    { id: '3', text: 'Just relaxing. Any plans for the weekend?', sender: 'me', timestamp: Date.now() - 10000 },
];

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');

    const handleSend = useCallback(() => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText.trim(),
                sender: 'me',
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, newMessage]);
            setInputText('');
        }
    }, [inputText]);

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={[
            styles.messageBubble,
            item.sender === 'me' ? styles.myMessage : styles.theirMessage
        ]}>
            <Text style={[
                styles.messageText,
                item.sender === 'me' ? styles.myMessageText : styles.theirMessageText
            ]}>
                {item.text}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                        activeOpacity={0.8}
                    >
                        <Send {...({ size: 20, stroke: "#FFF" } as any)} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
    messageList: {
        padding: SPACING.md,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.sm,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.background.card,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    messageText: {
        fontSize: 16,
    },
    myMessageText: {
        color: '#FFF',
    },
    theirMessageText: {
        color: COLORS.text.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: SPACING.md,
        backgroundColor: COLORS.background.card,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.background.main,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        fontSize: 16,
        marginRight: SPACING.sm,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
