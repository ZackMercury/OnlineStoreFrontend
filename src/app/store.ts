import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import filterReducer from "../slices/filterSlice";
import loadingReducer from "../slices/loadingSlice";
import userReducer from "../slices/userSlice";


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        category: categoryReducer,
        filter: filterReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;