import { createSlice } from "@reduxjs/toolkit";

export const downloadPdfSlice = createSlice({
    name: "pdf",
    initialState: {
        values: localStorage.getItem("pdf")
            ? JSON.parse(localStorage.getItem("pdf"))
            : null,
    },
    reducers: {
        pdfDownload: (state, actions) => {
            state.values = actions.payload;
        },
    },
});

export const { pdfDownload } = downloadPdfSlice.actions;

export default downloadPdfSlice.reducer;
