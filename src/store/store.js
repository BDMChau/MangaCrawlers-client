import { configureStore } from "@reduxjs/toolkit";
import UserSlice  from "./slices/UserSlice";
import AuthSlice  from "./slices/AuthSlice";
import ApiSlice  from "./slices/ApiSlice";
import MangaSlice  from "./slices/MangaSlice";
import StuffsSlice  from "./slices/StuffsSlice";

export const store = configureStore({
    reducer: {
        userState: UserSlice,
        authState: AuthSlice,
        apiState: ApiSlice,
        mangaState: MangaSlice,
        stuffsState: StuffsSlice
    }
});

