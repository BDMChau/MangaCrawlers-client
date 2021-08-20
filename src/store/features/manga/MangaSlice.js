const { createSlice } = require("@reduxjs/toolkit");


const MangaSlice = createSlice({
    name: "MangaSlice",
    initialState: JSON.parse(localStorage.getItem("mangaid")) ? [JSON.parse(localStorage.getItem("mangaid"))] : [],
    reducers: {
        SET_MANGA_ID: (state, action) => {
            if (!state.length) {
                state.push(action.payload);
            } else if (state[0]) {
                state[0] = action.payload;
            }
        },
        SET_MANGA_SEARCHED_BY_GENRES: (state, action) => {
            const mangas = action.payload[0];
            const genres = action.payload[1];

            state[1] = [mangas, genres];
        },

        ///////////////////
        GET_ALL_GENRES: (state, action) => {
            console.log("Getting all genres")
        },
        GET_ALL_GENRES_SUCCESS: (state, action) => {
            const response = action.payload;
            if (response.content.err) {
                return;
            }
            const genres = response.content.genres;
            genres.forEach(genre => {
                genre.isSelected = false;
            });

            state[2] = genres;
        },
        GET_ALL_GENRES_FAILED: (state, action) => {
            console.error(action.payload)
        },
    }
});

const { actions, reducer } = MangaSlice;
export const { SET_MANGA_ID, GET_ALL_GENRES, SET_MANGA_SEARCHED_BY_GENRES, GET_ALL_GENRES_SUCCESS, GET_ALL_GENRES_FAILED } = actions;
export default reducer;