import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        Token: localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null,
    },
    reducers: {
        userToken: (state, actions) => {
            state.Token = actions.payload;
        },
    },
});

export const { userToken } = tokenSlice.actions;

export default tokenSlice.reducer;
