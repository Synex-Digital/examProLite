import { createSlice } from "@reduxjs/toolkit";

export const modelTestSlice = createSlice({
    name: "modeltest",
    initialState: {
        values: localStorage.getItem("modeltest")
            ? JSON.parse(localStorage.getItem("modeltest"))
            : null,
    },
    reducers: {
        modelTest: (state, actions) => {
            state.values = actions.payload;
        },
    },
});

export const { modelTest } = modelTestSlice.actions;

export default modelTestSlice.reducer;
