const { createSlice } = require("@reduxjs/toolkit");

const StuffsSlice = createSlice({
    name: "StuffSlice",
    initialState: [],
    reducers: {
        SET_SCROLL_TOP: (state, action) => {
            state[0] = action.payload;
        },
        SET_SCROLL_BOTTOM: (state, action) => {
            state[1] = action.payload;
        },
        SET_INTERACT_NOTIFICATION: (state, action) => {
            state[2] = action.payload;
        }
    }
});

const { actions, reducer } = StuffsSlice;
export const { SET_SCROLL_TOP, SET_SCROLL_BOTTOM, SET_INTERACT_NOTIFICATION } = actions;

export default reducer;