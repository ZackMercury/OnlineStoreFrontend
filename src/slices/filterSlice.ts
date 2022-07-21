import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:
{
    value: { 
        sort?: string,
        sortBy?: string,
        priceMin?: number,
        priceMax?: number,
        searchQuery?: string
    }
} = {
    value: {}
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<typeof initialState.value>) => {
            state.value = action.payload;
        },
        setSortBy: (state, action: PayloadAction<"id" | "name" | "price">) => {
            state.value.sortBy = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.value.sort = action.payload;
        },
        setPriceMin: (state, action: PayloadAction<number>) => {
            state.value.priceMin = action.payload;
        },
        setPriceMax: (state, action: PayloadAction<number>) => {
            state.value.priceMax = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.value.searchQuery = action.payload;
        }
    }
});

export const {setFilter, setSort, setSortBy, setPriceMax, setPriceMin} = filterSlice.actions;

export default filterSlice.reducer;