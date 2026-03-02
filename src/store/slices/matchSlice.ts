import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { matchService } from '../../services/matchService';
import { User, Match } from '../../types/user';

interface MatchState {
    potentialMatches: User[];
    matches: Match[];
    loading: boolean;
    error: string | null;
}

const initialState: MatchState = {
    potentialMatches: [],
    matches: [],
    loading: false,
    error: null,
};

export const fetchMatches = createAsyncThunk(
    'match/fetchMatches',
    async (_, { rejectWithValue }) => {
        try {
            return await matchService.getMatches();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch matches');
        }
    }
);

export const swipeUser = createAsyncThunk(
    'match/swipe',
    async ({ userId, direction }: { userId: string; direction: 'like' | 'dislike' }, { rejectWithValue }) => {
        try {
            return await matchService.swipe(userId, direction);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to swipe');
        }
    }
);

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        removePotentialMatch: (state, action: PayloadAction<string>) => {
            state.potentialMatches = state.potentialMatches.filter(u => u.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMatches.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.matches = action.payload;
            })
            .addCase(fetchMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(swipeUser.fulfilled, (state, action) => {
                // Handle match logic if response indicates a match
            });
    },
});

export const { removePotentialMatch } = matchSlice.actions;
export default matchSlice.reducer;
