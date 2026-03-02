import 'dotenv/config';

export default {
    expo: {
        name: "sample-app",
        slug: "sample-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff"
            }
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        plugins: [
            "expo-router"
        ],
        extra: {
            apiUrl: process.env.API_URL,
            apiTimeout: process.env.API_TIMEOUT,
            eas: {
                projectId: "your-project-id"
            }
        }
    }
};
