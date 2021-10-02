const { createSlice } = require("@reduxjs/toolkit");

const StuffsSlice = createSlice({
    name: "StuffSlice",
    initialState: [],
    reducers: {
        SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE: (state, action) => {
            if (!state.length) {
                state.push(action.payload);
            } else if (state[0] === false || state[0] === true) {
                state[0] = action.payload;
            }
        },
        SET_COUNT_UNREAD_NOTIFICATIONS: (state, action) => {
            state[1] = action.payload;
        }
    }
});

const { actions, reducer } = StuffsSlice;
export const { SET_SCROLL_FIXED_DROPDOWN_CHAPTER_PAGE, SET_COUNT_UNREAD_NOTIFICATIONS } = actions;

export default reducer;