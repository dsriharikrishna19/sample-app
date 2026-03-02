import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setUser, logout } from '../store/slices/authSlice';
import { storage } from '../utils/storage';
import api from '../services/api';

/**
 * Enhanced useAuth Hook
 * Manages authentication state, token persistence, and auto-login.
 */
export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, token, isAuthenticated, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const checkAuth = useCallback(async () => {
        const savedToken = await storage.getToken();
        if (savedToken) {
            try {
                // In a real app, you'd fetch the user profile here
                // const userProfile = await userService.getProfile();
                // dispatch(setUser(userProfile));
            } catch (err) {
                dispatch(logout());
            }
        }
    }, [dispatch]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Handle global 401 via interception (already in api.ts, 
    // but we can add more logic here if needed)

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        logout: () => dispatch(logout()),
    };
}
