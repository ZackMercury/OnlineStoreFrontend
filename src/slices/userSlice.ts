import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:
{
    value: { 
        email?: string,
        login?: string
        firstname?: string,
        lastname?: string,
        isAdmin?: boolean,
        phone?: string,
        address?: string,
        favorites?: string[]
    }
} = {
    value: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<typeof initialState.value>) => {
            state.value = action.payload;
        }
    }
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;