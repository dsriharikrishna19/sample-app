// Mock delays to mimic actual network traffic latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
    isRead?: boolean;
}

// Conversations are grouped by the matched User ID
export interface Conversation {
    matchId: string;
    messages: Message[];
    unreadCount: number;
}

export const chatService = {
    // Fetch all existing conversations
    fetchConversations: async (): Promise<Record<string, Conversation>> => {
        await delay(600);
        // Initially empty string -> Conversation mapping.
        // We will populate this as users match and chat.
        return {};
    },

    // Emulate sending a message payload to Server
    sendMessage: async (matchId: string, text: string, senderId: string = '1'): Promise<Message> => {
        await delay(300);
        return {
            id: Math.random().toString(36).substring(7),
            text,
            senderId,
            timestamp: new Date().toISOString(),
            isRead: true
        };
    },

    // Simulates an automated backend webhook firing a reply back to us
    simulateIncomingMessage: async (matchId: string): Promise<Message> => {
        await delay(2000);

        const genericReplies = [
            "Haha that's so true!",
            "I was just thinking the same thing.",
            "Tell me more about that 😊",
            "Wow, really? That is so cool.",
            "I completely agree.",
            "Let's grab a coffee soon?",
            "Sounds like an adventure!",
            "What are you up to today?",
            "That's definitely a red flag 🚩 Just kidding!",
            "I love that for you."
        ];

        const randomReply = genericReplies[Math.floor(Math.random() * genericReplies.length)];

        return {
            id: Math.random().toString(36).substring(7),
            text: randomReply,
            senderId: matchId, // Received FROM the match
            timestamp: new Date().toISOString(),
            isRead: false
        };
    }
};
