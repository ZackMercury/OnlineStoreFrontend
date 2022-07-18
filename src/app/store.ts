import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import loadingReducer from "../slices/loadingSlice";


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        category: categoryReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;