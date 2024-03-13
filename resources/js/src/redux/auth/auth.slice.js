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
        department: null,
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
            state.department = null;
        },
        fetchAuthFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        changeUserDepartment(state, payload) {
            console.log("Dô: ", payload.payload);
            state.department = payload.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { saveUserInfo, removeUserInfo, changeUserDepartment } = authSlice.actions;

export default authSlice.reducer;
