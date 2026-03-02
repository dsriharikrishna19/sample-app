export const COLORS = {
    // Brand Colors
    primary: '#FE3C72', // Tinder Pink
    secondary: '#FF7854', // Tinder Orange
    accent: '#42E1AD', // Success/Like
    error: '#FF4444',
    warning: '#FFBB00',
    info: '#17A2B8',

    // Neutral Palette
    text: {
        primary: '#111827', // Gray 900
        secondary: '#4B5563', // Gray 600
        tertiary: '#9CA3AF', // Gray 400
        light: '#FFFFFF',
    },

    background: {
        main: '#F9FAFB', // Gray 50
        card: '#FFFFFF',
        surface: '#F3F4F6', // Gray 100
        dark: '#111827',
    },

    // UI Elements
    border: '#E5E7EB', // Gray 200
    divider: '#F3F4F6',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',

    gradients: {
        primary: ['#FE3C72', '#FF7854'],
        secondary: ['#42E1AD', '#2BB673'],
    },

    // Status Alpha
    primaryAlpha: (opacity: number) => `rgba(254, 60, 114, ${opacity})`,
    accentAlpha: (opacity: number) => `rgba(66, 225, 173, ${opacity})`,
};
