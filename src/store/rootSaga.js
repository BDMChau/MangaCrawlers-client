import { all } from "redux-saga/effects";
import mangaSaga from "./features/manga/MangaSaga";
import forumSaga from "./features/forum/ForumSaga";


export default function* rootSata() {
    yield all([
        mangaSaga(),
        forumSaga()
    ]);
}