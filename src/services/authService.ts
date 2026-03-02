import api from './api';
import { ENDPOINTS } from './endpoints';
import { LoginFormData, RegisterFormData } from '../schemas/authSchema';

export const authService = {
    login: async (data: LoginFormData) => {
        const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },
    register: async (data: RegisterFormData) => {
        const response = await api.post(ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    },
    logout: async () => {
        // Optional: Call logout endpoint if exists
    },
};

