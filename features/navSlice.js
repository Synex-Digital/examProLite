import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "navvalue",
    initialState: {
        value: false,
    },
    reducers: {
        navvalue: (state, actions) => {
            state.value = actions.payload;
        },
    },
});

export const { navvalue } = counterSlice.actions;

export default counterSlice.reducer;
