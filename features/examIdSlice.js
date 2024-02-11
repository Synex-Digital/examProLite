import { createSlice } from "@reduxjs/toolkit";

export const examIdSlice = createSlice({
    name: "examid",
    initialState: {
        id: localStorage.getItem("examid")
            ? JSON.parse(localStorage.getItem("examid"))
            : 1,
    },
    reducers: {
        userExamid: (state, actions) => {
            state.id = actions.payload;
        },
    },
});

export const { userExamid } = examIdSlice.actions;

export default examIdSlice.reducer;