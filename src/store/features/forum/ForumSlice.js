import arrayMethods from "helpers/arrayMethods";

const { createSlice } = require("@reduxjs/toolkit");


const ForumSlice = createSlice({
    name: "ForumSlice",
    initialState: [],
    reducers: {
        ///////////////////
        GET_ALL_CATEGORIES: (state, action) => {
            console.log("Getting all categories")
        },
        GET_ALL_CATEGORIES_SUCCESS: (state, action) => {
            const response = action.payload;
            if (response.content.err) {
                console.error(action.payload)
                return;
            }
            const categories = arrayMethods.shuffle(response.content.categories);

            state[0] = categories;
        },
        GET_ALL_CATEGORIES_FAILED: (state, action) => {
            console.error(action.payload)
        },

        ///////////////////
        GET_ALL_TOPICS: (state, action) => {
            console.log("Getting all topics")
        },
        GET_ALL_TOPICS_SUCCESS: (state, action) => {
            const response = action.payload;
            if (response.content.err) {
                return;
            }
            const genres = response.content.genres;
            genres.forEach(genre => {
                genre.isSelected = false;
            });

            state[1] = genres;
        },
        GET_ALL_TOPICS_FAILED: (state, action) => {
            console.error(action.payload)
        },

    }
});

const { actions, reducer } = ForumSlice;
export const { GET_ALL_CATEGORIES, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILED, GET_ALL_TOPICS, GET_ALL_TOPICS_SUCCESS, GET_ALL_TOPICS_FAILED } = actions;
export default reducer;