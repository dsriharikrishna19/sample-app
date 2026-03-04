import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ErrorBoundary from '../components/ErrorBoundary';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../theme/colors';

SplashScreen.preventAutoHideAsync();

// Route guard — redirect based on auth/onboarding state
function RouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const segments = useSegments();
    const { isAuthenticated, isOnboarded } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';
        const inTabsGroup = segments[0] === '(tabs)';

        if (isAuthenticated && isOnboarded) {
            // User is fully set up — send to home if they're on an auth screen
            if (inAuthGroup) {
                router.replace('/pages/home');
            }
        } else {
            // Not onboarded — send to login if they're not in auth group
            if (!inAuthGroup) {
                router.replace('/(auth)/login');
            }
        }
    }, [isAuthenticated, isOnboarded, segments]);

    return <>{children}</>;
}

function AppLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <RouteGuard>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </RouteGuard>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background.main }}>
                        <ActivityIndicator color={COLORS.primary} size="large" />
                    </View>
                }
                persistor={persistor}
            >
                <ErrorBoundary>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <AppLayout />
                    </GestureHandlerRootView>
                </ErrorBoundary>
            </PersistGate>
        </Provider>
    );
}
