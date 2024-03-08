import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        loading: false,
        userData: {
            id: null,
            email: null,
            FirstName: null,
            LastName: null,
            Phone: null,
            Title: null,
            Avatar: null,
            Branch: null,
            EmployeeCode: null,
            Location: null,
            Permissions: null,
        },
        error: null,
        accessToken: null,
        success: false,
    },
    reducers: {
        saveUserInfo(state, action) {
            state.loading = true;
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.userData = action.payload;
            state.error = null;
        },
        removeUserInfo(state) {
            state.userData = null;
            state.isAuthenticated = false;
            state.accessToken = null;
        },
        fetchAuthFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;
