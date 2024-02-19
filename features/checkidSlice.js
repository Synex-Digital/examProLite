import { createSlice } from "@reduxjs/toolkit";

export const checkidSlice = createSlice({
    name: "checkid",
    initialState: {
        value: localStorage.getItem("checkid")
            ? JSON.parse(localStorage.getItem("checkid"))
            : {},
    },
    reducers: {
        checkId: (state, actions) => {
            const { qid, id } = actions.payload;
            state.value = { ...state.value, [qid]: id };
        },
    },
});


export const { checkId } = checkidSlice.actions;

export default checkidSlice.reducer;
