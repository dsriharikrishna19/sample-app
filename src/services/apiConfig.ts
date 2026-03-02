import Constants from 'expo-constants';

export const API_CONFIG = {
    BASE_URL: Constants.expoConfig?.extra?.apiUrl || "https://yourapi.com/api/v1",
    TIMEOUT: Number(Constants.expoConfig?.extra?.apiTimeout) || 10000,
};
