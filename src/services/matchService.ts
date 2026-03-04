import { MOCK_USERS } from '../utils/mockData';
import { User } from '../types/user';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const matchService = {
    // Fetch users the current user hasn't swiped on yet
    fetchPotentialMatches: async (swipedIds: string[] = []): Promise<User[]> => {
        await delay(800);

        // Assume logged in user is ID '1' (from our existing MOCK_USERS)
        const currentUserId = '1';
        return MOCK_USERS.filter(user => user.id !== currentUserId && !swipedIds.includes(user.id));
    },

    // Simulate swiping. 30% chance of matching if swiped right.
    swipeUser: async (userId: string, direction: 'LEFT' | 'RIGHT'): Promise<{ matched: boolean, user?: User }> => {
        await delay(500);

        // No match on a left swipe
        if (direction === 'LEFT') {
            return { matched: false };
        }

        // Simulate a probabilistic match backend component (40% match chance for right swipe)
        const isMatch = Math.random() > 0.6;

        if (isMatch) {
            const user = MOCK_USERS.find(u => u.id === userId);
            return { matched: true, user };
        }

        return { matched: false };
    }
};
