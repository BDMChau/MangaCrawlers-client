import genreApi from 'api/apis/MainServer/genreApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILED, GET_ALL_TOPICS, GET_ALL_TOPICS_SUCCESS, GET_ALL_TOPICS_FAILED } from './ForumSlice';

function* getAllCategories(action) {
    try {
        const response = yield call(genreApi.getAll, action.payload);
        yield put(GET_ALL_CATEGORIES_SUCCESS(response));

    } catch (error) {
        yield put(GET_ALL_CATEGORIES_FAILED({ err: `Get all categories failed: ${error}` }));
        return;
    }
}

function* getAllTopics(action) {
    try {
        const response = yield call(genreApi.getAll, action.payload);
        yield put(GET_ALL_TOPICS_SUCCESS(response));

    } catch (error) {
        yield put(GET_ALL_TOPICS_FAILED({ err: `Get all categories failed: ${error}` }));
        return;
    }
}

export default function* forumSaga() {
    yield takeLatest(GET_ALL_CATEGORIES, getAllCategories);

    yield takeLatest(GET_ALL_TOPICS, getAllTopics);
}