import { configureStore } from "@reduxjs/toolkit";
import UserSlice  from "./slices/UserSlice";
import AuthSlice  from "./slices/AuthSlice";
import ApiSlice  from "./slices/ApiSlice";

export const store = configureStore({
    reducer: {
        userState: UserSlice,
        authState: AuthSlice,
        apiState: ApiSlice
    }
})

