import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:
{
    value: string[]
} = {
    value: ["All items"]
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        enterInto: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        },

        setCategory: (state, action: PayloadAction<typeof initialState.value>) => {
            state.value = action.payload;
        }
    }
});

export const {enterInto, setCategory} = categorySlice.actions;

export default categorySlice.reducer;