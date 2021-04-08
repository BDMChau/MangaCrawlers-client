const { createSlice } = require("@reduxjs/toolkit");



const stuffsSlice = createSlice({
    name: "stuffsSlice",
    initialState: [],
    reducers: {
        CLOSE_SIGN_UP_FORM: (state, action) => {
            state.push(action.payload);
        },
        RESET: (state) => {
            state = [];
        }
    }
})

const { actions, reducer } = stuffsSlice;
export const { CLOSE_SIGN_UP_FORM, RESET } = actions;
export default reducer;