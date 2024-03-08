import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        users: [],
        error: null,
        success: false,
    },
    reducers: {
        fetchUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.success = action.payload.success;
        },
        fetchUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetchUserStart, fetchUserSuccess } = userSlice.actions;

export default userSlice.reducer;
