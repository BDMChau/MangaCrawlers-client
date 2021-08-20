import genreApi from 'api/apis/genreApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_ALL_GENRES, GET_ALL_GENRES_SUCCESS, GET_ALL_GENRES_FAILED } from './MangaSlice';

function* getAllGenres(action) {
    try {
        const response = yield call(genreApi.getAll, action.payload);
        yield put(GET_ALL_GENRES_SUCCESS(response));

    } catch (error) {
        yield put(GET_ALL_GENRES_FAILED({ err: `Get all genres failed: ${error}` }));
        return;
    }
}

export default function* mangaSaga() {
    yield takeLatest(GET_ALL_GENRES, getAllGenres);
}