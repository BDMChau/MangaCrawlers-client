import { configureStore } from "@reduxjs/toolkit";
import usersSlice  from "./slices/usersSlice";
import stuffsSlice  from "./slices/stuffsSlice";

export const store = configureStore({
    reducer: {
        usersSlice: usersSlice,
        stuffsSlice: stuffsSlice
    }
})

