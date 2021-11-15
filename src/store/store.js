import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import UserSlice from "./features/user/UserSlice";
import AuthSlice from "./features/auth/AuthSlice";
import MangaSlice from "./features/manga/MangaSlice";
import ForumSlice from "./features/forum/ForumSlice";
import StuffsSlice from "./features/stuffs/StuffsSlice";
import SearchSlice from "./features/search/searchSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        userState: UserSlice,
        authState: AuthSlice,
        mangaState: MangaSlice,
        forumState: ForumSlice,
        searchState: SearchSlice,
        stuffsState: StuffsSlice
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(sagaMiddleware)
    )
});

sagaMiddleware.run(rootSaga)

