import { all } from "redux-saga/effects";
import mangaSaga from "./features/manga/MangaSaga";

export default function* rootSata() {
    console.log("root saga");
    yield all([mangaSaga()]);
}