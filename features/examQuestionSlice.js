import { createSlice } from "@reduxjs/toolkit";

export const examQuestionSlice = createSlice({
    name: "question",
    initialState: {
        Question: localStorage.getItem("question")
            ? JSON.parse(localStorage.getItem("question"))
            : null,
    },
    reducers: {
        userExamQuestion: (state, actions) => {
            state.Question = actions.payload;
        },
    },
});

export const { userExamQuestion } = examQuestionSlice.actions;

export default examQuestionSlice.reducer;
