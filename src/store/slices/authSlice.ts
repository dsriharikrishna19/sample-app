import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { storage } from '../../utils/storage';
import { AuthState, User } from '../../types/user';
import { LoginFormData, RegisterFormData } from '../../schemas/authSchema';
import { OnboardingFormData } from '../../schemas/onboardingSchema';

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isOnboarded: false,
    registrationMobile: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginFormData, { rejectWithValue }) => {
        try {
            const response = await authService.login(data);
            await storage.setToken(response.token);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterFormData, { rejectWithValue }) => {
        try {
            const response = await authService.register(data);
            await storage.setToken(response.token);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRegistrationMobile: (state, action: PayloadAction<string>) => {
            state.registrationMobile = action.payload;
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setOnboardingData: (state, action: PayloadAction<OnboardingFormData>) => {
            const data = action.payload;
            state.user = {
                id: state.user?.id || Date.now().toString(),
                fullName: data.fullName,
                mobile: data.mobile,
                email: data.email || '',
                age: data.age,
                gender: data.gender,
                height: data.height,
                city: data.city,
                state: data.state,
                country: data.country,
                bio: data.bio,
                zodiacSign: data.zodiacSign,
                relationshipType: data.relationshipType,
                datingIntent: data.datingIntent,
                interests: data.interests,
                images: data.images,
            };
            state.isAuthenticated = true;
            state.isOnboarded = true;
        },
        updateProfile: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        logout: (state) => {
            state.user = null;
            state.registrationMobile = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isOnboarded = false;
            state.error = null;
            storage.removeToken();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setRegistrationMobile, setUser, setOnboardingData, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
