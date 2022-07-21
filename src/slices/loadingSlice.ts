import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: true
}

export const loadingSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;