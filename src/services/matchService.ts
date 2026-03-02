import api from './api';
import { ENDPOINTS } from './endpoints';

export const matchService = {
    getMatches: async () => {
        const response = await api.get(ENDPOINTS.MATCH.GET_MATCHES);
        return response.data;
    },
    swipe: async (targetUserId: string, direction: 'like' | 'dislike') => {
        const response = await api.post(ENDPOINTS.MATCH.SWIPE, {
            targetUserId,
            direction,
        });
        return response.data;
    },
};

