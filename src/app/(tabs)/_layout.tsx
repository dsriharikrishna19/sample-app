import React, { useMemo } from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import {
    Flame,
    Search,
    MessageCircle,
    User,
    Settings,
} from 'lucide-react-native';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * Custom Tab Bar Background for premium look
 */
const TabBarBackground = () => (
    <View style={styles.tabBarBackground} />
);

export default function TabLayout() {
    const { isTablet } = useResponsive();

    const screenOptions = useMemo(() => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text.tertiary,
        tabBarStyle: {
            backgroundColor: COLORS.background.card,
            borderTopWidth: 1,
            borderTopColor: COLORS.divider,
            height: Platform.OS === 'ios' ? 95 : 75,
            paddingBottom: Platform.OS === 'ios' ? 35 : 15,
            paddingTop: 12,
            elevation: 10,
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            ...(isTablet ? {
                maxWidth: 600,
                alignSelf: 'center',
                borderRadius: 35,
                marginBottom: 25,
                marginHorizontal: 20,
                borderWidth: 1,
                borderColor: COLORS.divider,
            } : {}),
        },
        tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: -4,
        }
    }), [isTablet]);

    return (
        <Tabs screenOptions={screenOptions as any}>
            <Tabs.Screen
                name="pages/home"
                options={{
                    title: 'Matcher',
                    tabBarIcon: ({ color, size }) => <Flame color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="pages/search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="pages/chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="pages/profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="pages/settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
                }}
            />
            {/* Hide legacy matches tab if it exists in routes */}
            <Tabs.Screen
                name="pages/matches"
                options={{
                    href: null,
                }}
            />
            {/* Hide settings sub-pages from tab bar */}
            <Tabs.Screen
                name="pages/settings/notifications"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="pages/settings/language"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="pages/settings/premium"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="pages/settings/privacy"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="pages/settings/help"
                options={{ href: null }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.background.card,
        opacity: 0.95,
    },
});
