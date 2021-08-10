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
    }
});

const { actions, reducer } = MangaSlice;
export const { SET_MANGA_ID, SET_MANGA_SEARCHED_BY_GENRES } = actions;
export default reducer;