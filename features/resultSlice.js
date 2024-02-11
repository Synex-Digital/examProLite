import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
    name: "result",
    initialState: {
        value: localStorage.getItem("result")
            ? JSON.parse(localStorage.getItem("result"))
            : null,
    },
    reducers: {
        examResult: (state, actions) => {
            state.value = actions.payload;
        },
    },
});

export const { examResult } = resultSlice.actions;

export default resultSlice.reducer;