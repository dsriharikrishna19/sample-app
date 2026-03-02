import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * useNetworkStatus Hook
 * Monitors the device's network connectivity.
 */
export function useNetworkStatus() {
    const [isConnected, setIsConnected] = useState<boolean | null>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { isConnected };
}
