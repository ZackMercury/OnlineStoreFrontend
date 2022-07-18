import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:
{
    value: string[]
} = {
    value: ["Household items", "Bathroom"]
}

export const loadingSlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        enterInto: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload)
        },

        setCategory: (state, action: PayloadAction<string[]>) => {
            state.value = action.payload;
        }
    }
});

export default loadingSlice.reducer;