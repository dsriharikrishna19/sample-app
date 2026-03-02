export interface User {
    id: string;
    name: string;
    age: number;
    bio: string;
    images: string[];
    interests: string[];
    gender: 'male' | 'female' | 'other';
    location?: {
        latitude: number;
        longitude: number;
        city: string;
    };
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface Match {
    id: string;
    user: User;
    lastMessage?: string;
    timestamp: string;
}
