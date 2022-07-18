import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:
{
    value: string[]
} = {
    value: []
}

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        },

        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.value = action.payload;
        }
    }
});

export default favoritesSlice.reducer;