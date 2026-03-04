export interface UserProfile {
    id: string;
    fullName: string;
    mobile: string;
    email?: string;
    age: number;
    gender: "male" | "female" | "other" | "prefer_not_to_say";
    height: number;
    city: string;
    state: string;
    country: string;

    bio: string;
    zodiacSign:
    | "Aries"
    | "Taurus"
    | "Gemini"
    | "Cancer"
    | "Leo"
    | "Virgo"
    | "Libra"
    | "Scorpio"
    | "Sagittarius"
    | "Capricorn"
    | "Aquarius"
    | "Pisces";

    relationshipType: "Serious" | "Casual" | "Marriage" | "Friendship";
    datingIntent: "Long-term" | "Short-term";

    interests: string[];
    images: string[];
}

export interface User extends UserProfile {
    // Basic User for legacy support if needed
}

export interface AuthState {
    user: User | null;
    registrationMobile: string | null;
    token: string | null;
    isAuthenticated: boolean;
    isOnboarded: boolean;
    loading: boolean;
    error: string | null;
}

export interface Match {
    id: string;
    user: User;
    lastMessage?: string;
    timestamp: string;
}
