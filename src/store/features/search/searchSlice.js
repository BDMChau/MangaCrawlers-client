const { createSlice } = require("@reduxjs/toolkit");

const SearchSlice = createSlice({
    name: "SearchSlice",
    initialState: [],
    reducers: {
        SET_VALUE: (state, action) => {
            state[0] = action.payload;
        },
        SET_MANGA: (state, action) => {
            state[1] = action.payload;
        },
        SET_POSTS: (state, action) => {
            state[2] = action.payload;
        },
        SET_USERS: (state, action) => {
            state[3] = action.payload;
        },
        SET_PATH: (state, action) => {
            state[4] = action.payload;
        },
        SET_IS_SEARCHED: (state, action) => {
            state[5] = action.payload;
        }
    }
});

const { actions, reducer } = SearchSlice;
export const { SET_VALUE, SET_MANGA, SET_POSTS, SET_USERS, SET_PATH, SET_IS_SEARCHED } = actions;

export default reducer;