import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { matchService } from '../../services/matchService';
import { User } from '../../types/user';

interface MatchState {
    potentialMatches: User[];
    matches: User[];
    swipedIds: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: MatchState = {
    potentialMatches: [],
    matches: [],
    swipedIds: [],
    status: 'idle',
    error: null,
};

export const fetchPotentialMatches = createAsyncThunk(
    'match/fetchPotentialMatches',
    async (_, { getState }) => {
        const state = getState() as any;
        const swipedIds = state.match.swipedIds;
        const response = await matchService.fetchPotentialMatches(swipedIds);
        return response;
    }
);

export const swipeOnUser = createAsyncThunk(
    'match/swipeOnUser',
    async ({ userId, direction }: { userId: string, direction: 'LEFT' | 'RIGHT' }) => {
        const response = await matchService.swipeUser(userId, direction);
        return { userId, direction, ...response };
    }
);

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Matches
        builder.addCase(fetchPotentialMatches.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchPotentialMatches.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.potentialMatches = action.payload;
        });
        builder.addCase(fetchPotentialMatches.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch matches';
        });

        // Swipe Action
        builder.addCase(swipeOnUser.fulfilled, (state, action) => {
            // Add to swiped history
            state.swipedIds.push(action.payload.userId);

            // Remove from potential viewing pile
            state.potentialMatches = state.potentialMatches.filter(u => u.id !== action.payload.userId);

            // If it was a successful match, append to match list!
            if (action.payload.matched && action.payload.user) {
                state.matches.push(action.payload.user);
            }
        });
    },
});

export default matchSlice.reducer;
