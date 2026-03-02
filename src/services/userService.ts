import api from './api';
import { ENDPOINTS } from './endpoints';
import { ProfileFormData } from '../schemas/profileSchema';

export const userService = {
    getProfile: async () => {
        const response = await api.get(ENDPOINTS.USER.PROFILE);
        return response.data;
    },
    updateProfile: async (data: ProfileFormData) => {
        const response = await api.put(ENDPOINTS.USER.UPDATE, data);
        return response.data;
    },
};
