import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { chatService, Conversation, Message } from '../../services/chatService';

interface ChatState {
    conversations: Record<string, Conversation>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ChatState = {
    conversations: {},
    status: 'idle',
    error: null,
};

export const fetchConversations = createAsyncThunk(
    'chat/fetchConversations',
    async () => {
        const response = await chatService.fetchConversations();
        return response;
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ matchId, text }: { matchId: string, text: string }) => {
        const response = await chatService.sendMessage(matchId, text);
        return { matchId, message: response };
    }
);

export const receiveMessage = createAsyncThunk(
    'chat/receiveMessage',
    async (matchId: string) => {
        const response = await chatService.simulateIncomingMessage(matchId);
        return { matchId, message: response };
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        initializeConversation: (state, action: PayloadAction<string>) => {
            const matchId = action.payload;
            if (!state.conversations[matchId]) {
                state.conversations[matchId] = {
                    matchId,
                    messages: [],
                    unreadCount: 0
                };
            }
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const matchId = action.payload;
            if (state.conversations[matchId]) {
                state.conversations[matchId].unreadCount = 0;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            const { matchId, message } = action.payload;
            if (!state.conversations[matchId]) {
                state.conversations[matchId] = { matchId, messages: [], unreadCount: 0 };
            }
            state.conversations[matchId].messages.push(message);
        });

        builder.addCase(receiveMessage.fulfilled, (state, action) => {
            const { matchId, message } = action.payload;
            if (!state.conversations[matchId]) {
                state.conversations[matchId] = { matchId, messages: [], unreadCount: 0 };
            }
            state.conversations[matchId].messages.push(message);
            state.conversations[matchId].unreadCount += 1;
        });
    },
});

export const { initializeConversation, markAsRead } = chatSlice.actions;
export default chatSlice.reducer;
