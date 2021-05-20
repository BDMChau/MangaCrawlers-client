const { createSlice } = require("@reduxjs/toolkit");


const MangaSlice = createSlice({
    name: "MangaSlice",
    initialState: JSON.parse(localStorage.getItem("mangaid")) ? [JSON.parse(localStorage.getItem("mangaid"))] : [],
    reducers: {
        SET_MANGA_ID: (state, action) => {
            if (!state.length) {
                state.push(action.payload);
            } else if(state[0]) {
                state[0] = action.payload;
            }
        },
    }
})

const { actions, reducer } = MangaSlice;
export const { SET_MANGA_ID } = actions;
export default reducer;