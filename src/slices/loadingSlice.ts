import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    value: false
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

export default loadingSlice.reducer;