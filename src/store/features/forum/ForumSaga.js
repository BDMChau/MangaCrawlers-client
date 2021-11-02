import { GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILED, GET_ALL_TOPICS, GET_ALL_TOPICS_SUCCESS, GET_ALL_TOPICS_FAILED } from './ForumSlice';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import forumApi from 'api/apis/MainServer/forumApi';


function* getAllCategories(action) {
    try {
        const response = yield call(forumApi.getListCategory, action.payload);
        yield put(GET_ALL_CATEGORIES_SUCCESS(response));

    } catch (error) {
        yield put(GET_ALL_CATEGORIES_FAILED({ err: `Get all categories failed: ${error}` }));
        return;
    }
}

// function* getAllTopics(action) {
//     try {
//         // const response = yield call(genreApi.getAll, action.payload);
//         // yield put(GET_ALL_TOPICS_SUCCESS(response));

//     } catch (error) {
//         yield put(GET_ALL_TOPICS_FAILED({ err: `Get all categories failed: ${error}` }));
//         return;
//     }
// }

export default function* forumSaga() {
    yield takeLatest(GET_ALL_CATEGORIES, getAllCategories);
    // yield takeLatest(GET_ALL_TOPICS, getAllTopics);
}